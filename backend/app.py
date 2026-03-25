from fastapi import FastAPI

from routes.user import users_router
from routes.conversation import conversations_router
from routes.message import message_router

API = FastAPI()

API.include_router(users_router)
API.include_router(conversations_router)
API.include_router(message_router)
