import type { RecordId } from "surrealdb"
import type { Role } from "../enums/role"

export type Message = {
    id?: RecordId,
    uuid: string,
    role: Role,
    content: string,
    thinking?: string,
    creation_timestamp: number
    generation_speed?: number
}
