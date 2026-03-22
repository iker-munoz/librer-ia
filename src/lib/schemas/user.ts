import type { Permission } from "$lib/enums/permission"
import type { RecordId } from "surrealdb"

export type User = {
    id?: RecordId,
    uuid: string,
    username: string,
    password_hash: string,
    permissions: Permission
}   
