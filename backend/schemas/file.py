from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from models.file import FileStatus


class FileUploadResponse(BaseModel):
    id: int
    user_id: int
    name: str
    size: int
    mime: Optional[str]
    storage_key: str
    status: FileStatus
    folder_id: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class FileListResponse(BaseModel):
    id: int
    user_id: int
    name: str
    size: int
    mime: Optional[str]
    storage_key: str
    status: FileStatus
    folder_id: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

