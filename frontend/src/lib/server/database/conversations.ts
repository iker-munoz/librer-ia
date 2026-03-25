import type { Conversation } from "$lib/schemas/conversation";
import type { User } from "$lib/schemas/user";
import { DB } from "./setup";

export const get_conversations = async function(user: User): Promise<Conversation[]> {
    const [conversations] = await DB.query<[Conversation[]]>(
        `
            ( SELECT -> has -> conversation.* AS conversations FROM user 
            WHERE uuid = $user_uuid )[0].conversations;
        `,
        { user_uuid: user.uuid }
    );
    return conversations.sort((a, b) => b.last_message_timestamp - a.last_message_timestamp);
}

export const get_conversation = async function(current_user: User, conversation_uuid: string): Promise<Conversation | undefined> {
    const [conversation] = await DB.query<[Conversation]>(
        `
            ( SELECT *, -> has -> message.* AS messages FROM
                ( SELECT -> has -> conversation.* AS conversations FROM user
                WHERE uuid = $user_uuid )[0].conversations
            WHERE uuid = $conversation_uuid )[0];
        `,
        {
            user_uuid: current_user.uuid,
            conversation_uuid: conversation_uuid
        }
    );
    return conversation;
}
