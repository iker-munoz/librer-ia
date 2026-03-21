import type { Conversation } from "$lib/schemas/conversation";
import { DB } from "./setup";

export const create_new_conversation = async function(current_user_uuid: string, new_conversation_uuid: string) {
    await DB.query(
        `
            $user = ( SELECT * FROM user WHERE uuid = $current_user_uuid )[0];
            $conversation = ( CREATE conversation SET
                uuid = $new_conversation_uuid,
                title = "New conversation",
                creation_timestamp = time::millis(),
                last_message_timestamp = time::millis(),
                is_favorite = false )[0];
            RELATE $user -> has -> $conversation;
        `,
        { current_user_uuid, new_conversation_uuid }
    );
}

export const get_conversations = async function(current_user_uuid: string): Promise<Conversation[]> {
    const [_, conversations] = await DB.query<[undefined, Conversation[]]>(
        `
            $user = ( SELECT * FROM user WHERE uuid = $current_user_uuid )[0];
            ( SELECT -> has -> conversation.* AS conversations FROM $user )[0].conversations;
        `,
        { current_user_uuid }
    );
    return conversations.sort((a, b) => b.last_message_timestamp - a.last_message_timestamp);
}

// export const get_conversation = async function(current_user: User, conversation_uuid: string): Promise<Conversation> {}


