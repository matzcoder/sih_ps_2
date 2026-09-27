from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from backend.app.core.config import settings
import logging

logger = logging.getLogger(__name__)

Base = declarative_base()

# Attempt to connect to Postgres, fallback to SQLite if offline
def get_engine():
    try:
        # Check if database URL is valid
        if "postgresql" in settings.DATABASE_URL:
            engine = create_engine(
                settings.DATABASE_URL,
                pool_pre_ping=True,
                pool_size=10,
                max_overflow=20
            )
            # Try lightweight connection test
            with engine.connect() as conn:
                logger.info("Successfully connected to PostgreSQL.")
            return engine
        else:
            return create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
    except Exception as e:
        if settings.USE_SQLITE_FALLBACK:
            logger.warning(f"Could not connect to PostgreSQL ({e}). Falling back to local SQLite: {settings.SQLITE_URL}")
            return create_engine(settings.SQLITE_URL, connect_args={"check_same_thread": False})
        raise e

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
