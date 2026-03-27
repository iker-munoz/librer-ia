import type { AbortableAsyncIterator, ChatResponse } from "ollama";
import type { Message } from "../../schemas/message";

import { INFERENCE } from "../setup/inference";

export const get_steamable_chat_response = async function(messages: Message[], think: boolean)
: Promise<AbortableAsyncIterator<ChatResponse>> {
    return await INFERENCE.chat({
        model: "librer-ia",
        messages,
        think,
        stream: true
    })
}
