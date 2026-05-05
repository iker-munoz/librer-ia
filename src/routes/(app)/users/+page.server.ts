import { read_all_users, create_user, delete_user } from "$lib/server/database/users";
import { Permission } from "$lib/enums/permission";
import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";

export const load = async () => {
    const users_raw = await read_all_users();
    // Transforma el RecordId de SurrealDB en una cadena normal para evitar errores de serialización de SvelteKit.
    const users = users_raw.map(u => ({ ...u, id: u.id?.toString() }));
    return {
        users
    };
};

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const username = data.get("username")?.toString();
        const password = data.get("password")?.toString();

        if (!username || !password) {
            return { success: false, error: "Username and password are required" };
        }

        const password_hash = createHash("sha3-256").update(password).digest("hex");

        try {
            await create_user({
                uuid: uuidv4(),
                username,
                password_hash,
                permissions: Permission.USER
            });
            return { success: true };
        } catch (e) {
            console.error(e);
            return { success: false, error: "Failed to create user" };
        }
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const uuid = data.get("uuid")?.toString();

        if (!uuid) {
            return { success: false, error: "User UUID is required" };
        }

        try {
            await delete_user(uuid);
            return { success: true };
        } catch (e) {
            console.error(e);
            return { success: false, error: "Failed to delete user" };
        }
    }
};