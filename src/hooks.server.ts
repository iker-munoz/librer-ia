import type { Handle } from "@sveltejs/kit";
import { building } from "$app/environment";

import { database_setup } from "$lib/server/database/setup";
import { inference_setup } from "$lib/server/inference/setup";

import type { User } from "$lib/schemas/user";

if (!building) {
    console.log("")
    console.log("Starting setup...")

    await database_setup();
    await inference_setup();

    console.log("Setup completed!")
    console.clear();
}

export const handle: Handle = async ({ event, resolve }) => {
    const current_user_cookie_data: string | undefined = event.cookies.get("current_user");
    if (current_user_cookie_data) {
        const current_user: User = JSON.parse(current_user_cookie_data) as User;
        event.locals.user = current_user;
    }

    return resolve(event);
}
