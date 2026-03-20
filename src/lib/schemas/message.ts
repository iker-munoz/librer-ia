import type { RecordId } from "surrealdb"
import type { Role } from "../enums/role"

export type Message = {
    id: RecordId,
    uuid: string,
    role: Role,
    content: string,
    creation_timestamp: number
    genreation_speed: number
}
