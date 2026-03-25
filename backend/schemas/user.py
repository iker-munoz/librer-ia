from dataclasses import dataclass
from typing import Optional

from surrealdb import RecordID

from enums.permission import Permission

@dataclass
class User():
    id: Optional[RecordID]
    uuid: str
    username: str
    password_hash: str
    permissions: Permission
