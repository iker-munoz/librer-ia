import { fail, redirect } from "@sveltejs/kit";
import type{ Cookies } from "@sveltejs/kit";

import pkg from "js-sha3";
const { sha3_256 } = pkg;

import type { User } from "$lib/schemas/user";
import { DB } from "$lib/server/database";

export const actions = {
    login: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data: FormData = await request.formData();
        const username: string | undefined = data.get("username")?.toString();
        const password: string | undefined = data.get("password")?.toString();
        
        if (!username) return fail(400, { username, username_error: "Please input your username!" })
        if (!password) return fail(400, { username, password_error: "Please input your password" })
        
    const [_, user] = await DB.query<[null, User]>(
        `
            $users = SELECT * FROM user WHERE username = $username AND password_hash = $password_hash;
            RETURN $users[0];
        `,
        {
            username,
            password_hash: sha3_256(password)
        }
    )       
        if (!user) return fail(400, { username, validation_error: "Invalid credentials" })
        cookies.set("current_user", JSON.stringify(user), { 
            path: "/",
            maxAge: (60 * 60 * 24 * 7) // One week of valid session
        })
        redirect(307, "/new_conversation")
    }
}
