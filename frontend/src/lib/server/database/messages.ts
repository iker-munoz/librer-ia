import type { Conversation } from "$lib/schemas/conversation";
import type { Message } from "$lib/schemas/message";
import type { User } from "$lib/schemas/user";

import { DB } from "./setup";

export const save_message = async function(user: User, conversation: Conversation, message: Message) {}
