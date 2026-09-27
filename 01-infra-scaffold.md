# Phase 1: Infrastructure & Backend Scaffolding

## Objective
Set up the project root, Docker infrastructure, and the core FastAPI/Celery backend.

## Execution Steps
1. **Initialize Directories (Windows):**
   Execute PowerShell commands to create the following backend tree:
   - `backend\app\api\v1\endpoints`
   - `backend\app\core`
   - `backend\app\services\file_parser`
   - `backend\app\services\preprocessing`
   - `backend\app\services\feature_extraction`
   - `backend\app\services\inference`
   - `backend\app\workers`
   - `backend\app\models`
   - `backend\app\schemas`
   - `backend\app\db\migrations`
   - `backend\ml\training`
   - `backend\ml\registry`

2. **Core Dependencies:**
   Create `backend\requirements.txt` containing: `fastapi`, `uvicorn`, `celery`, `redis`, `sqlalchemy`, `psycopg2-binary`, `numpy`, `scipy`, `librosa`, `sigmf`, `torch`, `scikit-learn`, `python-multipart`, `pydantic-settings`.

3. **Core Backend Files:**
   - `backend\app\core\config.py`: Setup Pydantic BaseSettings for DB and Redis URIs.
   - `backend\app\main.py`: Initialize the FastAPI app and configure CORS.
   - `backend\app\api\v1\endpoints\upload.py`: Create POST endpoints for `.wav`, `.cfile`, and `.sigmf-data` uploads.
   - `backend\app\workers\celery_app.py`: Initialize the Celery instance connecting to the Redis broker.

4. **Docker Infrastructure:**
   Create `docker-compose.yml` in the root containing services for: `postgres`, `redis`, `backend-api`, and `celery-worker`.
