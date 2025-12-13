from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class FolderCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, description="Folder name")
    parent_folder_id: Optional[int] = Field(None, description="Parent folder ID for nested folders")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Documents",
                "parent_folder_id": None
            }
        }


class FolderUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="New folder name")
    parent_folder_id: Optional[int] = Field(None, description="New parent folder ID")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Updated Documents",
                "parent_folder_id": 1
            }
        }


class FolderResponse(BaseModel):
    id: int
    user_id: int
    name: str
    parent_folder_id: Optional[int]
    path: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class FolderWithChildrenResponse(FolderResponse):
    """Folder response with nested children and file count"""
    children_count: int = 0
    files_count: int = 0
    children: List["FolderResponse"] = []

    class Config:
        from_attributes = True


class FolderTreeResponse(BaseModel):
    """Folder tree structure for hierarchical display"""
    id: int
    name: str
    path: str
    parent_folder_id: Optional[int]
    children: List["FolderTreeResponse"] = []
    files_count: int = 0

    class Config:
        from_attributes = True

