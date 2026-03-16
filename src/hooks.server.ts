import type { Handle } from "@sveltejs/kit";
import { building } from "$app/environment";

import { database_setup } from "$lib/server/database";

if (!building) {
    await database_setup();
}

export const handle: Handle = async ({ event, resolve }) => {
    return resolve(event);
}
