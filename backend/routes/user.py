from fastapi import APIRouter

from schemas.user import User

users_router = APIRouter(tags=["Users"], prefix="/users")

@users_router.post("/")
async def create_user(user: User):
    pass

@users_router.get("/")
async def read_users() -> list[User]:
    pass

@users_router.get("/{user_uuid}")
async def read_user(user_uuid: str) -> User:
    pass

@users_router.put("/")
async def update_user(user: User):
    pass

@users_router.delete("/{user_uuid}")
async def delete_user(user_uuid: str):
    pass
