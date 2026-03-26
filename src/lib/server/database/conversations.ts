import type { Conversation } from "$lib/schemas/conversation";
import type { User } from "$lib/schemas/user";
import { DB } from "../setup/database";

// export const create_conversation = async function(user: User, conversation: Conversation) {}

export const read_all_conversations = async function(user: User): Promise<Conversation[]> {
    const query: string = `
        ( SELECT -> has -> conversation.* AS conversations FROM user
        WHERE uuid = $user.uuid )[0].conversations
    `
    const payload = { user }

    const [conversations] = await DB.query<[Conversation[]]>(query, payload);
    return conversations.sort((a, b) => b.last_message_timestamp - a.last_message_timestamp);
}

export const read_conversation = async function(user: User, conversation_uuid: string): Promise<Conversation | undefined> {
    const query: string = `
        ( SELECT *, -> has -> message.* AS messages FROM
            ( SELECT -> has -> conversation.* AS conversations FROM user
            WHERE uuid = $user.uuid )[0].conversations
        WHERE uuid = $conversation_uuid )[0]
    `
    const payload = { user, conversation_uuid }

    const [conversation] = await DB.query<[Conversation]>(query, payload);
    return conversation;
}

// export const update_conversation = async function(user: User, conversation: Conversation) {}

// export const delete_conversation = async function(user: User, conversation_uuid: string) {}
