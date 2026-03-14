import type { Role } from "../enums/role"

export type Message = {
    id: string,
    role: Role,
    creation_timestamp: number
}
