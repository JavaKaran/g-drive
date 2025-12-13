"""
Example of a protected route using JWT authentication.
This file demonstrates how to use the authentication dependency.
You can delete this file or use it as a reference.
"""
from fastapi import APIRouter, Depends
from models.user import User
from dependencies.auth import get_current_active_user
from schemas.auth import UserResponse

router = APIRouter(prefix="/protected", tags=["protected"])


@router.get("/me", response_model=UserResponse)
async def get_my_info(current_user: User = Depends(get_current_active_user)):
    """
    Example protected route that requires authentication.
    Only authenticated users can access this endpoint.
    """
    return current_user


@router.get("/example")
async def protected_example(current_user: User = Depends(get_current_active_user)):
    """
    Another example of a protected route.
    The current_user dependency ensures the user is authenticated and active.
    """
    return {
        "message": f"Hello {current_user.username}!",
        "user_id": current_user.id,
        "email": current_user.email
    }

