import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, DateTime, JSON, Text

try:
    from backend.app.db.session import Base
except ImportError:
    from app.db.session import Base  # type: ignore

def get_utc_now():
    return datetime.now(timezone.utc)

class SignalJob(Base):
    __tablename__ = "signal_jobs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String(255), nullable=False)
    file_type = Column(String(32), nullable=False) # 'wav', 'cfile', 'sigmf'
    file_path = Column(String(512), nullable=False)
    meta_path = Column(String(512), nullable=True) # for .sigmf-meta
    file_size_bytes = Column(Integer, default=0)

    # Signal Ingestion Parameters
    sample_rate = Column(Float, nullable=False, default=2048000.0)
    center_freq = Column(Float, nullable=False, default=100000000.0)
    dtype = Column(String(32), nullable=False, default="complex64")

    # Execution State
    status = Column(String(32), default="PENDING", index=True) # PENDING, PROCESSING, COMPLETED, FAILED
    progress = Column(Float, default=0.0) # 0 to 100
    current_stage = Column(String(64), default="QUEUED")
    error_message = Column(Text, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=get_utc_now)
    updated_at = Column(DateTime, default=get_utc_now, onupdate=get_utc_now)

    # Detailed Analysis Results
    results = Column(JSON, nullable=True)


