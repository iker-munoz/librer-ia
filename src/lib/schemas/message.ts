import type { RecordId } from "surrealdb"
import type { Role } from "../enums/role"

export type Message = {
    id: RecordId,
    role: Role,
    creation_timestamp: number
}
