import type { User } from "$lib/schemas/user";

import { v4 as Uuid } from "uuid";

import { redirect, type Cookies } from "@sveltejs/kit";
import { create_new_conversation } from "$lib/server/database/conversations";
import type { Message } from "$lib/schemas/message";
import { Role } from "$lib/enums/role";
import { create_new_message } from "$lib/server/database/messages";

export const actions = {
    default: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data: FormData = await request.formData();
        const message: string = data.get("message")!.toString();
        
        const current_user_cookie_data: string | undefined = cookies.get("current_user");
        if (!current_user_cookie_data) redirect(303, "/login");

        const current_user: User = JSON.parse(current_user_cookie_data) as User;
        const new_conversation_uuid: string = Uuid();
        await create_new_conversation(current_user.uuid, new_conversation_uuid);

        const new_message: Message = {
            uuid: Uuid(),
            role: Role.USER,
            content: message,
            creation_timestamp: new Date().getMilliseconds(),
            generation_speed: 0
        }
        await create_new_message(current_user.uuid, new_conversation_uuid, new_message);

        redirect(303, `/conversation/${new_conversation_uuid}`)
    }
}
