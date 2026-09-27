from fastapi import APIRouter
from backend.app.api.v1.endpoints import upload, jobs

api_router = APIRouter()

api_router.include_router(upload.router, prefix="", tags=["Upload"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
