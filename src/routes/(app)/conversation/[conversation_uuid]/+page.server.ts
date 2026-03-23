import type { PageServerLoad } from "./$types";

import type { User } from "$lib/schemas/user";
import { get_conversation } from "$lib/server/database/conversations";
import type { Conversation } from "$lib/schemas/conversation";

export const load: PageServerLoad = async ({params, locals}) => {
    const current_user: User = locals.user!;
    let conversation: Conversation | undefined = await get_conversation(current_user, params.conversation_uuid);
    if (!conversation) {
        const current_timestamp: number = new Date().getTime();

        conversation = {
            uuid: params.conversation_uuid,
            title: "",
            messages: [],
            is_favorite: false,
            creation_timestamp: current_timestamp,
            last_message_timestamp: current_timestamp
        }
    }
    return { conversation_string: JSON.stringify(conversation) }
}
