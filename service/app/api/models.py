from sqlalchemy.dialects.postgresql import INTEGER, VARCHAR, DOUBLE_PRECISION
from sqlalchemy import Column
from geoalchemy2 import Geometry
from ..db.database import Base


class Store(Base):
    __tablename__ = 'store'

    id = Column(INTEGER, primary_key=True, index=True)
    the_geom = Column(Geometry('POINT'))
    cartodb_id = Column(INTEGER)
    type = Column(VARCHAR)
    latitude = Column(DOUBLE_PRECISION)
    longitude = Column(DOUBLE_PRECISION)
    color = Column(VARCHAR)
