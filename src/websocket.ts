import type { WebSocketManager, WSConnection, WSMessage } from "sveltekit-ws"
import { getWebSocketManager } from "sveltekit-ws"

import type { AbortableAsyncIterator, ChatResponse } from "ollama"
import { v4 as Uuid } from "uuid";

import { Role } from "./lib/enums/role";

import type { Conversation } from "./lib/schemas/conversation"
import type { Message } from "./lib/schemas/message"

import { get_steamable_chat_response } from "./lib/server/inference/chat"
import { create_message } from "./lib/server/database/messages";

export const connection_handler = (connection: WSConnection) => {
    console.log("Client connection:", connection.id)
}

export const message_handler = async (connection: WSConnection, message: WSMessage) => {
    const {
        conversation,
        reasoning
    } = message as unknown as {
        conversation: Conversation
        reasoning: boolean
    }

    const new_message: Message = {
        uuid: Uuid(),
        role: Role.ASSISTANT,
        content: "",
        thinking: "",
        creation_timestamp: new Date().getTime(),
        generation_speed: 0
    }
    const response_stream: AbortableAsyncIterator<ChatResponse> = await get_steamable_chat_response(conversation.messages, reasoning);
    const manager: WebSocketManager = getWebSocketManager()
    for await (const part of response_stream) {
        if (part.message.content) new_message.content += part.message.content
        if (part.message.thinking) new_message.thinking += part.message.thinking
        if (part.total_duration) new_message.generation_speed = part.total_duration
        manager.send(connection.id, part as unknown as WSMessage)
    }

    await create_message(conversation, new_message);
    
}

export const disconnection_handler = (connection: WSConnection) => {
    console.log("Client left:", connection.id)
}
