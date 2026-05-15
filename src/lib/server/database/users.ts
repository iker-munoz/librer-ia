import type { User } from "$lib/schemas/user";
import { DB } from "../setup/database";

export const create_user = async function(user: User) {
    const query: string = `
        INSERT INTO user {
            uuid: $user.uuid,
            username: $user.username,
            password_hash: $user.password_hash,
            permissions: $user.permissions
        }
    `
    const payload = { user }
    await DB.query(query, payload);
}

// export const read_all_users = async function(): Promise<User[]> {}

export const read_all_root_users = async function(): Promise<User[]> {
    const query: string = `
        DEFINE TABLE IF NOT EXISTS user;
        SELECT * FROM user WHERE permissions = "Root";
    `
    const [_, users] = await DB.query<[undefined, User[]]>(query)
    return users
}

// export const read_user = async function(user_uuid: string): Promise<User> {}

export const read_user_with_credentials = async function(username: string, password_hash: string): Promise<User | undefined> {
    const query: string = `SELECT * FROM user WHERE username = $username AND password_hash = $password_hash`
    const payload = { username, password_hash }
    const [users] = await DB.query<[User[]]>(query, payload);
    return users[0] ?? undefined;
}

// export const update_user = async function(user: User) {}

// export const delete_user = async function(user_uuid: string) {}
