from fastapi import APIRouter

from schemas.message import Message

message_router = APIRouter(tags=["Message"], prefix="/message")

@message_router.post("/")
async def create_message(message: Message):
    pass
