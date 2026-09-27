import logging
import sys
from pathlib import Path

# Add project root and backend directory to sys.path for direct script/worker execution
_root_dir = str(Path(__file__).resolve().parents[3])
_backend_dir = str(Path(__file__).resolve().parents[2])
if _root_dir not in sys.path:
    sys.path.insert(0, _root_dir)
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

try:
    from backend.app.core.config import settings
except ImportError:
    from app.core.config import settings  # type: ignore

logger = logging.getLogger(__name__)

try:
    from celery import Celery  # type: ignore

    celery_app = Celery(
        "signal_worker",
        broker=settings.CELERY_BROKER_URL,
        backend=settings.CELERY_RESULT_BACKEND,
        include=["backend.app.workers.tasks"]
    )

    celery_app.conf.update(
        task_serializer="json",
        accept_content=["json"],
        result_serializer="json",
        timezone="UTC",
        enable_utc=True,
        task_track_started=True,
        task_time_limit=3600,
        worker_prefetch_multiplier=1,
        worker_concurrency=2,
        result_expires=86400,
    )
    logger.info("Celery application initialized with Redis broker.")

except ImportError:
    logger.warning("Celery package not installed in active environment. Using fallback task wrapper.")
    class DummyCelery:
        def __init__(self, *args, **kwargs):
            self.main = "signal_worker_fallback"
            self.conf = {}
        def task(self, *args, **kwargs):
            def decorator(fn):
                def delay(*task_args, **task_kwargs):
                    return fn(*task_args, **task_kwargs)
                fn.delay = delay
                return fn
            return decorator

    celery_app = DummyCelery()

if __name__ == "__main__":
    if hasattr(celery_app, "start"):
        celery_app.start()
