import { json } from "@sveltejs/kit";

import type { User } from "$lib/schemas/user";
import { DB } from "$lib/server/database";

export async function POST({ request }: { request: Request }) {
     const {
         username,
         password_hash
     } = await request.json();

    const [_, user] = await DB.query<[null, User]>(
        `
            $users = SELECT * FROM user WHERE username = $username AND password_hash = $password_hash;
            RETURN $users[0];
        `,
        {
            username,
            password_hash
        }
    )

    if (!user) return json ({}, { status: 404 })
    return json(user, { status: 200 })
}
