import type { Conversation } from "$lib/schemas/conversation";
import type { User } from "$lib/schemas/user";
import { DB } from "./setup";

export const save_conversation = async function(user: User, conversation: Conversation) {
    await DB.query(
        `
            LET $user = ( SELECT * FROM user WHERE uuid = $user_uuid )[0];
            LET $conversation = ( CREATE conversation SET
                uuid = $conversation_uuid,
                title = $conversation_title,
                is_favorite = $conversation_is_favorite,
                creation_timestamp = $conversation_creation_timestamp,
                last_message_timestamp = $conversation_last_message_timestamp )[0];
            RELATE $user -> has -> $conversation;
        `,
        {
            user_uuid: user.uuid,
            conversation_uuid: conversation.uuid,
            conversation_title: conversation.title,
            conversation_is_favorite: conversation.is_favorite,
            conversation_creation_timestamp: conversation.creation_timestamp,
            conversation_last_message_timestamp: conversation.last_message_timestamp
        }
    );
}

export const get_conversations = async function(user: User): Promise<Conversation[]> {
    const [_, conversations] = await DB.query<[undefined, Conversation[]]>(
        `
            LET $user = ( SELECT * FROM user WHERE uuid = $user_uuid )[0];
            ( SELECT -> has -> conversation.* AS conversations FROM $user )[0].conversations;
        `,
        { user_uuid: user.uuid }
    );
    return conversations.sort((a, b) => b.last_message_timestamp - a.last_message_timestamp);
}

// export const get_conversation = async function(current_user: User, conversation_uuid: string): Promise<Conversation> {}
