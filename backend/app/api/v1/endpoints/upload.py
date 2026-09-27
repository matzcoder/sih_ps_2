import os
import uuid
import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.app.db.session import get_db
from backend.app.models.signal_job import SignalJob
from backend.app.schemas.signal_job import SignalJobResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

ALLOWED_EXTENSIONS = {
    "wav": "wav",
    "cfile": "cfile",
    "sigmf-data": "sigmf",
    "sigmf-meta": "sigmf",
    "iq": "cfile",
    "bin": "cfile",
    "raw": "cfile"
}

def get_extension(filename: str) -> str:
    parts = filename.lower().split(".")
    if len(parts) > 1:
        if filename.lower().endswith(".sigmf-data"):
            return "sigmf-data"
        if filename.lower().endswith(".sigmf-meta"):
            return "sigmf-meta"
        return parts[-1]
    return ""

def trigger_job_processing(job_id: str):
    """
    Attempts to enqueue job into Celery.
    If Celery/Redis is unreachable, logs fallback for local execution.
    """
    try:
        from backend.app.workers.tasks import process_signal_job
        process_signal_job.delay(job_id)
        logger.info(f"Enqueued job {job_id} to Celery worker.")
    except Exception as e:
        logger.warning(f"Could not reach Celery broker ({e}). Executing async locally in background task.")
        try:
            from backend.app.workers.tasks import run_pipeline_sync
            run_pipeline_sync(job_id)
        except Exception as local_err:
            logger.error(f"Local pipeline execution failed for {job_id}: {local_err}")

@router.post("/upload", response_model=SignalJobResponse)
async def upload_signal(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    meta_file: UploadFile = File(None),
    sample_rate: float = Form(2048000.0),
    center_freq: float = Form(100000000.0),
    dtype: str = Form("complex64"),
    db: Session = Depends(get_db)
):
    """
    Upload raw IQ (.cfile, .sigmf-data) or Audio (.wav) file and initialize DSP pipeline.
    """
    ext = get_extension(file.filename)
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Supported formats: .wav, .cfile, .sigmf-data, .iq, .bin, .raw"
        )

    file_type = ALLOWED_EXTENSIONS[ext]
    job_id = str(uuid.uuid4())
    upload_dir = os.path.join(settings.UPLOAD_DIR, job_id)
    os.makedirs(upload_dir, exist_ok=True)

    safe_filename = os.path.basename(file.filename)
    dest_path = os.path.join(upload_dir, safe_filename)

    # Save uploaded file in chunks
    file_size = 0
    try:
        with open(dest_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        file_size = os.path.getsize(dest_path)
    except Exception as e:
        logger.error(f"Failed to save uploaded file: {e}")
        raise HTTPException(status_code=500, detail="Failed to save file on disk.")

    meta_dest_path = None
    if meta_file:
        meta_filename = os.path.basename(meta_file.filename)
        meta_dest_path = os.path.join(upload_dir, meta_filename)
        try:
            with open(meta_dest_path, "wb") as buffer:
                shutil.copyfileobj(meta_file.file, buffer)
        except Exception as e:
            logger.warning(f"Failed to save metadata file: {e}")

    # Create Database Record
    new_job = SignalJob(
        id=job_id,
        filename=safe_filename,
        file_type=file_type,
        file_path=dest_path,
        meta_path=meta_dest_path,
        file_size_bytes=file_size,
        sample_rate=sample_rate,
        center_freq=center_freq,
        dtype=dtype,
        status="PENDING",
        progress=0.0,
        current_stage="INGESTED"
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    # Enqueue background task
    background_tasks.add_task(trigger_job_processing, job_id)

    return new_job
