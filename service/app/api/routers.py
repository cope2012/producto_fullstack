from fastapi import APIRouter, status, Depends, Query
from typing import List
from sqlalchemy.orm import Session
from .models import Store
from .schemas import Store as StoreSchema
from ..db.database import SessionLocal


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/all', response_model=List[StoreSchema], response_model_exclude_none=True)
async def get_all_stores(db: Session = Depends(get_db)):
    return db.query(Store).all()
