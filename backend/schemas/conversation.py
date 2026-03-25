from dataclasses import dataclass
from typing import Optional

from surrealdb import RecordID

from schemas.message import Message

@dataclass
class Conversation():
    id: Optional[RecordID]
    uuid: str
    title: str
    messages: list[Message]
    is_favorite: bool
    creation_timestamp: int
    last_message_timestamp: int
