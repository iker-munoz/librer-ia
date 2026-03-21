import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { Conversation } from "$lib/schemas/conversation";
import { get_conversations } from "$lib/server/database/conversations";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.user) redirect(307, "/login");
    const user_conversations: Conversation[] = await get_conversations(locals.user.uuid);

    return {
        current_user: locals.user,
        user_conversations_string: JSON.stringify(user_conversations)
    }
}
