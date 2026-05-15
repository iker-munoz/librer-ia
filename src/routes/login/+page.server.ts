import { fail } from "@sveltejs/kit";
import type{ Cookies } from "@sveltejs/kit";

import pkg from "js-sha3";
const { sha3_256 } = pkg;

import type { User } from "$lib/schemas/user";
import { read_user_with_credentials } from "$lib/server/database/users";

export const actions = {
    default: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data: FormData = await request.formData();
        const username: string | undefined = data.get("username")?.toString();
        const password: string | undefined = data.get("password")?.toString();
        
        if (!username) return fail(400, { username, username_error: "Please input your username!" })
        if (!password) return fail(400, { username, password_error: "Please input your password" })
        
        const user: User | undefined = await read_user_with_credentials(username, sha3_256(password));
         
        if (!user) return fail(400, { username, validation_error: "Invalid credentials" })
        cookies.set("current_user", JSON.stringify(user), { 
            path: "/",
            maxAge: (60 * 60 * 24 * 7) // One week of valid session
        })
    }
}
