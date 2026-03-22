import { redirect, type Cookies } from "@sveltejs/kit";

import { v4 as Uuid } from "uuid";

import { Role } from "$lib/enums/role";
import type { Conversation } from "$lib/schemas/conversation";
import type { Message } from "$lib/schemas/message";
import type { User } from "$lib/schemas/user";

import { save_conversation } from "$lib/server/database/conversations";
import { save_message } from "$lib/server/database/messages";
import { generate_conversation_title } from "$lib/server/inference/generation";

export const actions = {
    default: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data: FormData = await request.formData();
        const message_content: string = data.get("message")!.toString();
        const current_timestamp: number = new Date().getTime();
        
        const current_user_cookie_data: string | undefined = cookies.get("current_user");
        if (!current_user_cookie_data) redirect(303, "/login");
        const current_user: User = JSON.parse(current_user_cookie_data) as User;

        const new_message: Message = {
            uuid: Uuid(),
            role: Role.USER,
            content: message_content,
            creation_timestamp: current_timestamp,
            generation_speed: 0
        }

        const new_conversation_title: string = await generate_conversation_title(new_message);
        const new_conversation: Conversation = {
            uuid: Uuid(),
            title: new_conversation_title,
            is_favorite: false,
            creation_timestamp: current_timestamp,
            last_message_timestamp: current_timestamp,
            messages: []
        }

        await save_conversation(current_user, new_conversation);
        await save_message(current_user, new_conversation, new_message);

        redirect(303, `/conversation/${new_conversation.uuid}`)
    }
}
