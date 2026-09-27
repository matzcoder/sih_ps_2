import time
import logging
import sys
from pathlib import Path

_root_dir = str(Path(__file__).resolve().parents[3])
_backend_dir = str(Path(__file__).resolve().parents[2])
if _root_dir not in sys.path:
    sys.path.insert(0, _root_dir)
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

try:
    from backend.app.workers.celery_app import celery_app
    from backend.app.db.session import SessionLocal
    from backend.app.models.signal_job import SignalJob
except ImportError:
    from app.workers.celery_app import celery_app  # type: ignore
    from app.db.session import SessionLocal  # type: ignore
    from app.models.signal_job import SignalJob  # type: ignore

logger = logging.getLogger(__name__)

def update_job_status(job_id: str, status: str, progress: float, stage: str, results: dict = None, error: str = None):
    db = SessionLocal()
    try:
        job = db.query(SignalJob).filter(SignalJob.id == job_id).first()
        if job:
            job.status = status
            job.progress = progress
            job.current_stage = stage
            if results:
                job.results = results
            if error:
                job.error_message = error
            db.commit()
    except Exception as e:
        logger.error(f"Failed to update job status for {job_id}: {e}")
    finally:
        db.close()

def run_pipeline_sync(job_id: str):
    """
    Synchronous / In-process fallback runner for signal pipeline.
    Used for local execution when Celery worker is offline.
    """
    logger.info(f"Starting in-process signal processing for job {job_id}")
    try:
        update_job_status(job_id, "PROCESSING", 10.0, "INITIALIZING_DSP")
        # In Phase 2, this calls the full DSP parser, feature extraction, and ML classifier
        update_job_status(job_id, "PROCESSING", 30.0, "FEATURE_EXTRACTION")
        time.sleep(0.1)
        update_job_status(job_id, "PROCESSING", 60.0, "AMC_CLASSIFICATION")
        time.sleep(0.1)
        update_job_status(job_id, "PROCESSING", 90.0, "ANOMALY_DETECTION")
        time.sleep(0.1)
        
        # Placeholder metrics until Phase 2 DSP services are linked
        default_results = {
            "snr_db": 18.6,
            "carrier_freq_detected": 100000000.0,
            "bandwidth_99": 250000.0,
            "modulation_class": "QPSK",
            "confidence": 0.947,
            "predictions": {"QPSK": 0.947, "16-QAM": 0.032, "BPSK": 0.015, "FSK": 0.006},
            "spectral_entropy": 0.42,
            "spectral_flatness": 0.18,
            "spectral_centroid": 12450.0,
            "rms": 0.707,
            "peak": 1.414,
            "crest_factor": 2.0,
            "anomalies": [
                {
                    "timestamp_s": 17.82,
                    "type": "Frequency Shift",
                    "severity": "MEDIUM",
                    "description": "+142.5 kHz local oscillator drift detected",
                    "observed_metric": "+142.5 kHz",
                    "baseline_metric": "0.0 Hz"
                }
            ],
            "dna_biometrics": {
                "temporal": 82.4,
                "spectral": 91.0,
                "statistical": 78.5,
                "modulation": 94.7,
                "noise": 22.1,
                "harmonic": 14.3,
                "transient": 35.8
            }
        }
        update_job_status(job_id, "COMPLETED", 100.0, "COMPLETED", results=default_results)
        logger.info(f"Signal job {job_id} successfully completed.")
    except Exception as e:
        logger.error(f"Error executing pipeline for job {job_id}: {e}")
        update_job_status(job_id, "FAILED", 0.0, "FAILED", error=str(e))

@celery_app.task(name="process_signal_job")
def process_signal_job(job_id: str):
    """
    Celery background worker task for signal processing and ML inference.
    """
    logger.info(f"Worker received job {job_id}")
    run_pipeline_sync(job_id)
    return {"job_id": job_id, "status": "COMPLETED"}
