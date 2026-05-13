import type { Conversation } from "$lib/schemas/conversation";
import type { User } from "$lib/schemas/user";
import { favorite_conversation } from "$lib/server/database/conversations";
import { redirect, type Cookies } from "@sveltejs/kit";

export const actions = {
    favorite: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const data: FormData = await request.formData();
        let conversation: Conversation = JSON.parse(data.get("conversation")!.toString());

        const current_user_cookie_data: string | undefined = cookies.get("current_user");
        if (!current_user_cookie_data) redirect(307, "/login")
        const current_user: User = JSON.parse(current_user_cookie_data) as User;

        await favorite_conversation(current_user, conversation.uuid, !conversation.is_favorite);
    },
    delete: async ({ request }: { request: Request }) => {
        return {}
    }
}
