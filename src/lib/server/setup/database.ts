import { Surreal } from "surrealdb";
import { v4 as Uuid } from "uuid";

import pkg from "js-sha3"
const { sha3_256 } = pkg;

import { Permission } from "$lib/enums/permission";
import type { User } from "$lib/schemas/user";
import { create_user, read_all_root_users } from "../database/users";

export const DB: Surreal = new Surreal();
await DB.connect("ws://localhost:8001", {
    namespace: "local",
    database: "librer-ia",
    authentication: {
        username: "root",
        password: "root"
    }
}).catch((err) => {
    throw new Error(`Error connecting to the database: ${err}`)
})

export const database_setup = async function() {
    const root_users: User[] = await read_all_root_users();
    console.log(root_users)
    if (root_users.length == 0) await create_root_user()

    console.log("Database setup completed!")
}

const create_root_user = async function() {
    const root_user: User = {
        uuid: Uuid(),
        username: "Root",
        password_hash: sha3_256("librer-ia"),
        permissions: Permission.ROOT
    }
    
    await create_user(root_user);
}
