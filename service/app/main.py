from fastapi import FastAPI
from .api.routers import router as api_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    api_router,
    prefix='/api/v1/stores',
    tags=['stores']
)
