from .base import Base
from backend import db

from dataclasses import dataclass
import uuid

@dataclass
class Movie(Base):
    id:int = db.Column(db.Integer, primary_key=True, index=True)
    title:str = db.Column(db.String(64), index=True)
    is_adult:bool = db.Column(db.Boolean, default=False)
    release_date:str = db.Column(db.Date)
    start_year:int = db.Column(db.Integer)
    genres:str = db.Column(db.String(128), index=True)
    external_id:str = db.Column(db.String(32))
