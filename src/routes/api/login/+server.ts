import { json } from "@sveltejs/kit";

import type { User } from "$lib/schemas/user";
import { DB } from "$lib/server/database";

export async function POST({ request }: { request: Request }) {
     const {
         username,
         password_hash
     } = await request.json();


    if (!user) return json ({}, { status: 400 })
    return json(user, { status: 200 })
}
