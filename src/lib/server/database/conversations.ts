import type { Conversation } from "$lib/schemas/conversation";
import type { User } from "$lib/schemas/user";
import { DB } from "./setup";

export const get_conversations = async function(current_user: User): Promise<Conversation[]> {
    const [_, conversations] = await DB.query<[User, Conversation[]]>(
        `
            $user = ( SELECT * FROM user WHERE uuid = $current_user_uuid )[0];
            ( SELECT -> has -> conversation.* AS conversations FROM $user )[0].conversations;
        `,
        { current_user_uuid: current_user.uuid }
    );
    return conversations.sort((a, b) => b.last_message_timestamp - a.last_message_timestamp);
}
