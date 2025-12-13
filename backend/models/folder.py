from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Index
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base


class Folder(Base):
    __tablename__ = "folders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    parent_folder_id = Column(Integer, ForeignKey("folders.id"), nullable=True, index=True)
    path = Column(String, nullable=False, index=True)  # Full path for easy querying (e.g., "/documents/projects")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", backref="folders")
    parent = relationship("Folder", remote_side=[id], backref="children")
    files = relationship("File", backref="folder")

    # Composite index for unique folder names per user per parent
    __table_args__ = (
        Index('ix_folder_user_parent_name', 'user_id', 'parent_folder_id', 'name', unique=True),
    )

