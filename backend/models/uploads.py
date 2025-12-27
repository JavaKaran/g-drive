import uuid
from sqlalchemy import Column, DateTime, ForeignKey, String, Enum, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from database import Base
import enum

class UploadStatus(str, enum.Enum):
    INPROGRESS = "inprogress"
    COMPLETED = "completed"
    ABORTED = "aborted"

class Upload(Base):
    __tablename__ = "uploads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    file_id = Column(UUID(as_uuid=True), ForeignKey("files.id"), nullable=False)
    upload_id = Column(String, nullable=False)
    file_fingerprint = Column(String, index=True, nullable=False)
    chunk_size = Column(Integer, nullable=False)
    total_parts = Column(Integer, nullable=False)
    status = Column(Enum(UploadStatus), default=UploadStatus.INPROGRESS, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    file = relationship("File", backref="upload")
    parts = relationship("UploadPart", back_populates="upload", cascade="all, delete-orphan")