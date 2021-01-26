from pydantic import BaseModel, root_validator
from typing import Optional


class Store(BaseModel):
    id: int
    cartodb_id: Optional[int]
    type: Optional[str]
    latitude: float
    longitude: float
    color: Optional[str]

    class Config:
        orm_mode = True
