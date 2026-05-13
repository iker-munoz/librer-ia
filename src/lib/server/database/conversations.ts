import type { Conversation } from "$lib/schemas/conversation";
import type { User } from "$lib/schemas/user";
import { DB } from "../setup/database";

export const create_conversation = async function(user: User, conversation: Conversation) {
    const query: string = `
        LET $current_user = ( SELECT * FROM user 
            WHERE uuid = $user.uuid );
        LET $new_conversation = INSERT INTO conversation {
            uuid: $conversation.uuid,
            title: $conversation.title,
            is_favorite: $conversation.is_favorite,
            creation_timestamp: $conversation.creation_timestamp,
            last_message_timestamp: $conversation.last_message_timestamp
        };
        RELATE $current_user -> has -> $new_conversation
    `
    const payload = { user, conversation }

    await DB.query(query, payload);
}

export const read_all_conversations = async function(user: User): Promise<Conversation[]> {
    const query: string = `
        ( SELECT -> has -> conversation.* AS conversations FROM user
        WHERE uuid = $user.uuid )[0].conversations
    `
    const payload = { user }

    const [conversations] = await DB.query<[Conversation[]]>(query, payload);
    return conversations;
}

export const read_conversation = async function(user: User, conversation_uuid: string): Promise<Conversation | undefined> {
    const query: string = `
        DEFINE TABLE IF NOT EXISTS conversation;
        ( SELECT *, -> has -> message.* AS messages FROM
            ( SELECT -> has -> conversation.* AS conversations FROM user
            WHERE uuid = $user.uuid )[0].conversations
        WHERE uuid = $conversation_uuid )[0]
    `
    const payload = { user, conversation_uuid }

    const [conversation] = await DB.query<[Conversation]>(query, payload);
    return conversation;
}

export const favorite_conversation = async function(user: User, conversation_uuid: string, favorite_state: boolean) {
    const query: string = `
        LET $conversation = ( SELECT *, -> has -> message.* AS messages FROM
            ( SELECT -> has -> conversation.* AS conversations FROM user
            WHERE uuid = $user.uuid )[0].conversations
        WHERE uuid = $conversation_uuid )[0];
        UPDATE $conversation SET
            is_favorite = $favorite_state;
    `
    const payload = { user, conversation_uuid, favorite_state }
    await DB.query(query, payload);
}

export const delete_conversation = async function(user: User, conversation_uuid: string) {
    const query: string = `
        LET $conversation = ( SELECT *, -> has -> message.* AS messages FROM
            ( SELECT -> has -> conversation.* AS conversations FROM user
            WHERE uuid = $user.uuid )[0].conversations
        WHERE uuid = $conversation_uuid )[0];
        DELETE $conversation -> has -> message, $conversation;
    `
    const payload = { user, conversation_uuid}
    await DB.query(query, payload);
}

