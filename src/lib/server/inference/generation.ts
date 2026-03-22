import { v4 as Uuid } from "uuid";

import { Role } from "$lib/enums/role";
import type { Message } from "$lib/schemas/message";
import type { ChatResponse } from "ollama";

import { INFERENCE } from "./setup";

export const generate_conversation_title = async function(first_conversation_message: Message): Promise<string> {
    const guideline_message: Message = { // TODO Improve the guideline templates
        uuid: Uuid(),
        role: Role.SYSTEM,
        content: `
            You must answer this message with a formatted JSON element that contains a 'conversation_title' field
            that you should retrieve from the earlier user messages.
            Try to describe the conversation and avoid repeating the users message, keep it correctly formatted
            like a proper sentence would be.
        `,
        creation_timestamp: new Date().getTime(),
        generation_speed: 0
    }

    const response_format = { // TODO Improve the response formats
        type: "object",
        properties: {
            conversation_title: {
                type: "string",
                description: `
                    The title of the current conversation generated from then given user messages,
                    keep it within a few words, as a general overview.
                    Limit yourself to a description of the messages.
                `
            }
        },
        required: ["conversation_title"]
    }

    const response: ChatResponse = await INFERENCE.chat({
        model: "librer-ia",
        messages: [first_conversation_message, guideline_message],
        think: false,
        stream: false,
        format: response_format
    })

    try {
        const conversation_title: string = JSON.parse(response.message.content).conversation_title;
        const formatted_conversation_title: string = conversation_title[0] + conversation_title.substring(1).toLowerCase();
        return formatted_conversation_title;
    } catch {
        return "New conversation"
    }
}
