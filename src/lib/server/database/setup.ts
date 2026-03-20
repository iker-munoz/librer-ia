import { Surreal } from "surrealdb";
import { v4 as Uuid } from "uuid";

import pkg from "js-sha3"
const { sha3_256 } = pkg;

import { Permission } from "$lib/enums/permission";

export const DB: Surreal = new Surreal();
await DB.connect("ws://localhost:8001", {
    namespace: "local",
    database: "libreria",
    authentication: {
        username: "root",
        password: "root"
    }
}).catch((err) => {
    throw new Error(`Error connecting to the database: ${err}`)
})

export const database_setup = async function() {
    await create_users_table();
    await create_conversations_table();
    await create_message_table();

    console.log("Database setup completed!")
}

const create_users_table = async function() {
    console.log("Creating users table...")
    await DB.query(`
        DEFINE TABLE IF NOT EXISTS user SCHEMAFULL;
        DEFINE FIELD IF NOT EXISTS uuid ON TABLE user TYPE string;
        DEFINE FIELD IF NOT EXISTS username ON TABLE user TYPE string;
        DEFINE FIELD IF NOT EXISTS password_hash ON TABLE user TYPE string;
        DEFINE FIELD IF NOT EXISTS permissions ON TABLE user TYPE string;
    `)

    await DB.query(
        `
            $roots = SELECT * FROM user WHERE permissions = "Root" LIMIT 1;
            IF array::len($roots) == 0 {
                CREATE user CONTENT {
                    uuid: $admin_uuid,
                    username: "Root",
                    password_hash: $admin_password_hash,
                    permissions: $admin_permissions,
                }
            }
        `,
        {
            admin_uuid: Uuid(),
            admin_password_hash: sha3_256("librer-ia"),
            admin_permissions: Permission.ROOT
        }
    )
}

const create_conversations_table = async function() {
    console.log("Creating conversations table...")
    await DB.query(`
        DEFINE TABLE IF NOT EXISTS conversation SCHEMAFULL;
        DEFINE FIELD IF NOT EXISTS uuid ON TABLE conversation TYPE string;
        DEFINE FIELD IF NOT EXISTS title ON TABLE conversation TYPE string;
        DEFINE FIELD IF NOT EXISTS creation_timestamp ON TABLE conversation TYPE number;
        DEFINE FIELD IF NOT EXISTS last_message_timestamp ON TABLE conversation TYPE number;
    `)
}

const create_message_table = async function() {
    console.log("Creating messages table...")
    await DB.query(`
        DEFINE TABLE IF NOT EXISTS message SCHEMAFULL;
        DEFINE FIELD IF NOT EXISTS uuid ON TABLE message TYPE string;
        DEFINE FIELD IF NOT EXISTS role ON TABLE message TYPE string;
        DEFINE FIELD IF NOT EXISTS content ON TABLE message TYPE string;
        DEFINE FIELD IF NOT EXISTS creation_timestamp ON TABLE message TYPE number;
        DEFINE FIELD IF NOT EXISTS generation_speed ON TABLE message TYPE number;
    `)
}
