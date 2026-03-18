import { Surreal, Table } from "surrealdb";
import { v4 as Uuid } from "uuid";
import argon2 from "argon2";

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
}

const create_users_table = async function() {
    await DB.query(`
        DEFINE TABLE IF NOT EXISTS user SCHEMAFULL;
        DEFINE FIELD IF NOT EXISTS uuid ON TABLE user TYPE string;
        DEFINE FIELD IF NOT EXISTS username ON TABLE user TYPE string;
        DEFINE FIELD IF NOT EXISTS password_hash ON TABLE user TYPE string;
        DEFINE FIELD IF NOT EXISTS permissions ON TABLE user TYPE string;
        DEFINE FIELD IF NOT EXISTS profile_picture ON TABLE user TYPE option<string>;
    `)

    await DB.query(
        `
            $roots = SELECT * FROM user WHERE permissions = "root" LIMIT 1;
            IF array::len($roots) == 0 {
                CREATE user CONTENT {
                    uuid: $admin_uuid,
                    username: "Admin",
                    password_hash: $admin_password_hash,
                    permissions: "root",
                    profile_picture: NONE
                }
            }
        `,
        {
            admin_uuid: Uuid(),
            admin_password_hash: await argon2.hash("librer-ia")
        }
    )
}

const create_conversations_table = async function() {
    await DB.query(`
        DEFINE TABLE IF NOT EXISTS conversation SCHEMAFULL;
        DEFINE FIELD IF NOT EXISTS uuid ON TABLE conversation TYPE string;
        DEFINE FIELD IF NOT EXISTS title ON TABLE conversation TYPE string;
        DEFINE FIELD IF NOT EXISTS creation_timestamp ON TABLE conversation TYPE number;
        DEFINE FIELD IF NOT EXISTS last_message_timestamp ON TABLE conversation TYPE number;
    `)
}

const create_message_table = async function() {
    await DB.query(`
        DEFINE TABLE IF NOT EXISTS message SCHEMAFULL;
        DEFINE FIELD IF NOT EXISTS uuid ON TABLE message TYPE string;
        DEFINE FIELD IF NOT EXISTS role ON TABLE message TYPE string;
        DEFINE FIELD IF NOT EXISTS content ON TABLE message TYPE string;
        DEFINE FIELD IF NOT EXISTS creation_timestamp ON TABLE message TYPE number;
    `)
}
