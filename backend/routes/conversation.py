from fastapi import APIRouter

from schemas.conversation import Conversation

conversations_router = APIRouter(tags=["Conversation"], prefix="/conversation")

@conversations_router.post("/")
async def create_conversation(conversation: Conversation):
    pass

@conversations_router.get("/")
async def read_conversations() -> list[Conversation]:
    pass

@conversations_router.get("/{conversation_uuid}")
async def read_conversation() -> Conversation:
    pass

@conversations_router.put("/")
async def update_conversation(conversation: Conversation):
    pass

@conversations_router.delete("/{conversation_uuid}")
async def delete_conversation(conversation_uuid: str):
    pass
