import type { Message } from "$lib/schemas/message";
import { DB } from "./setup";

export const create_new_message = async function(current_user_uuid: string, conversation_uuid: string, new_message: Message) {

    console.log(new_message)
    await DB.query(
        `
            $user = ( SELECT * FROM user WHERE uuid = $current_user_uuid )[0];
            $user_conversations = ( SELECT -> has -> conversation.* AS conversations FROM $user )[0].conversations;
            $conversation = ( SELECT * FROM $user_conversations WHERE uuid == $conversation_uuid )[0];
            $message = ( CREATE message SET $new_message)[0];
            RELATE $conversation -> has -> $message;
        `,
        {
            current_user_uuid,
            conversation_uuid,
            new_message_uuid: new_message.uuid,
            new_message_role: new_message.role,
            new_message_content: new_message.content,
            new_message_generation_speed: new_message.generation_speed,
        }
    );
}
