import { redirect, type Cookies } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

import type { User } from "$lib/schemas/user";
import type { Conversation } from "$lib/schemas/conversation";

import { read_conversation } from "$lib/server/database/conversations";

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
    return {
        conversation_string: JSON.stringify(conversation),
        conversation_exists
    }
}

export const actions = {
    default: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data: FormData = await request.formData();
        const conversation: Conversation = JSON.parse(data.get("conversation")!.toString())
        const conversation_exists: boolean = data.get("conversation_exists")? true: false;
        const content: string = data.get("content")!.toString();
        const reasoning: boolean = data.get("reasoning")? true: false;

        const current_user_cookie_data: string | undefined = cookies.get("current_user");
        if (!current_user_cookie_data) redirect(307, "/login")
        const current_user: User = JSON.parse(current_user_cookie_data) as User;

        // TODO Conversation logic

    }
}
