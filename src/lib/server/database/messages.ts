import type { Conversation } from "../../schemas/conversation";
import type { Message } from "../../schemas/message";

import { DB } from "../setup/database";

export const create_message = async function(conversation: Conversation, message: Message) {
    console.log(conversation.uuid)
    const query: string = `
        LET $current_conversation = ( SELECT * FROM conversation
            WHERE uuid = $conversation.uuid );
        LET $new_message = INSERT INTO message {
            uuid: $message.uuid,
            role: $message.role,
            content: $message.content,
            thinking: $message.thinking,
            creation_timestamp: $message.creation_timestamp,
            generation_speed: $message.generation_speed
        };
        RELATE $current_conversation -> has -> $new_message;
    `
    const payload = { conversation, message }
    await DB.query(query, payload);
}
