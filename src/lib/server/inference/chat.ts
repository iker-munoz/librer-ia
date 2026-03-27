import type { Message } from "$lib/schemas/message";
import type { ChatResponse } from "ollama";
import { INFERENCE } from "../setup/inference";

export const chat = async function(messages: Message[], think: boolean): Promise<ChatResponse> {
    const response = await INFERENCE.chat({
        model: "librer-ia",
        messages,
        think
    })
    return response
}
