from sqlalchemy import Column, Integer, String, BigInteger, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from database import Base


class FileStatus(str, enum.Enum):
    UPLOADING = "uploading"
    COMPLETED = "completed"
    FAILED = "failed"
    DELETED = "deleted"


class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    size = Column(BigInteger, nullable=False)  # File size in bytes
    mime = Column(String, nullable=True)  # MIME type
    storage_key = Column(String, nullable=False, unique=True, index=True)  # R2 object key
    status = Column(Enum(FileStatus), default=FileStatus.UPLOADING, nullable=False)
    folder_id = Column(Integer, ForeignKey("folders.id"), nullable=True, index=True)  # Reference to folder
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", backref="files")

