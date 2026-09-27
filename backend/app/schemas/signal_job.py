from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class SignalJobResponse(BaseModel):
    id: str
    filename: str
    file_type: str
    file_size_bytes: int
    sample_rate: float
    center_freq: float
    dtype: str
    status: str
    progress: float
    current_stage: str
    error_message: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    results: Optional[Dict[str, Any]] = None

    model_config = ConfigDict(from_attributes=True)

class SignalJobSummary(BaseModel):
    id: str
    filename: str
    file_type: str
    status: str
    progress: float
    created_at: Optional[datetime] = None
    modulation_class: Optional[str] = None
    snr_db: Optional[float] = None
    confidence: Optional[float] = None
