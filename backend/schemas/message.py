from dataclasses import dataclass
from typing import Optional

from surrealdb import RecordID

from enums.role import Role

@dataclass
class Message():
    id: Optional[RecordID]
    uuid: str
    role: Role
    content: str
    generation_speed: int
    creation_timestamp: int
