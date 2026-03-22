import type { Conversation } from "$lib/schemas/conversation";
import type { Message } from "$lib/schemas/message";
import type { User } from "$lib/schemas/user";

import { DB } from "./setup";

export const save_message = async function(user: User, conversation: Conversation, message: Message) {
    await DB.query(
        `
            $user = ( SELECT * FROM user WHERE uuid = $user_uuid )[0];
            $user_conversations = ( SELECT -> has -> conversation.* AS conversations FROM $user )[0].conversations;
            $conversation = ( SELECT * FROM $user_conversations WHERE uuid == $conversation_uuid )[0];
            $message = ( CREATE message SET
                uuid = $message_uuid,
                role = $message_role,
                content = $message_content,
                creation_timestamp = $message_creation_timestamp,
                generation_speed = $message_generation_speed )[0];
            RELATE $conversation -> has -> $message;
        `,
        {
            user_uuid: user.uuid,
            conversation_uuid: conversation.uuid,
            message_uuid: message.uuid,
            message_role: message.role,
            message_content: message.content,
            message_creation_timestamp: message.creation_timestamp,
            message_generation_speed: message.generation_speed
        }
    );
}
