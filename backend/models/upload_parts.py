import uuid
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class UploadPart(Base):
    __tablename__ = "upload_parts"

    upload_id = Column(UUID(as_uuid=True), ForeignKey("uploads.id"), primary_key=True, nullable=False)
    part_number = Column(Integer, primary_key=True, nullable=False)
    etag = Column(String, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    upload = relationship("Upload", back_populates="parts")