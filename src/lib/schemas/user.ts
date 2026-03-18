import type { Permission } from "$lib/enums/permission"

export type User = {
    id: string,
    username: string,
    password_hash: string,
    permissions: Permission,
    profile_picture?: string
}   
