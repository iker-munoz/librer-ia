import { redirect, type Cookies } from "@sveltejs/kit";

import { v4 as Uuid } from "uuid";

import type { PageServerLoad } from "./$types";

import type { User } from "$lib/schemas/user";
import type { Conversation } from "$lib/schemas/conversation";

import { create_conversation, read_conversation } from "$lib/server/database/conversations";
import { generate_conversation_title } from "$lib/server/inference/generation";

import { Role } from "$lib/enums/role";
import type { Message } from "$lib/schemas/message";
import { create_message } from "$lib/server/database/messages";

export const load: PageServerLoad = async ({params, locals}) => {
    const current_user: User = locals.user!;
    let conversation: Conversation | undefined = await read_conversation(current_user, params.conversation_uuid);
    let conversation_exists: boolean = true;
    if (!conversation) {
        const current_timestamp: number = new Date().getTime();

        conversation_exists = false;
        conversation = {
            uuid: params.conversation_uuid,
            title: "",
            messages: [],
            is_favorite: false,
            creation_timestamp: current_timestamp,
            last_message_timestamp: current_timestamp
        }
    }

    conversation.messages.sort((a, b) => a.creation_timestamp - b.creation_timestamp)
    return {
        conversation_string: JSON.stringify(conversation),
        conversation_exists
    }
}

export const actions = {
    default: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data: FormData = await request.formData();
        let conversation: Conversation = JSON.parse(data.get("conversation")!.toString())
        let conversation_exists: boolean = data.get("conversation_exists")? true: false;
        let content: string = data.get("content")!.toString();

        const current_user_cookie_data: string | undefined = cookies.get("current_user");
        if (!current_user_cookie_data) redirect(307, "/login")
        const current_user: User = JSON.parse(current_user_cookie_data) as User;
        
        const new_message: Message = {
            uuid: Uuid(),
            role: Role.USER,
            content,
            creation_timestamp: new Date().getTime(),
        }
        conversation.messages.push(new_message)

        if (!conversation_exists) {
            const conversation_title: string = await generate_conversation_title(conversation.messages[0]);
            conversation.title = conversation_title;
            await create_conversation(current_user, conversation)
        }

        await create_message(conversation, new_message);
        return { conversation }

    }
}
