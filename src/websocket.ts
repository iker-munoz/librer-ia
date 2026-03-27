import type { Message } from "$lib/schemas/message";
import { chat } from "$lib/server/inference/chat";
import { getWebSocketManager, WebSocketManager } from "sveltekit-ws";
import type { WSConnection, WSMessage } from "sveltekit-ws";

type WSMessageData = {
    messages: Message[],
    think: boolean
}

export const connection_handler = (connection: WSConnection) => {
    console.log("Client connection:", connection.id)
}

export const message_handler = async (connection: WSConnection, message: WSMessage) => {
    const message_data: WSMessageData = message as unknown as WSMessageData
    async function* asyncGenerator() { yield await chat(message_data.messages, message_data.think) }
    for await (const part of asyncGenerator()) {
        console.log(part.message.content)
    }

    const manager: WebSocketManager = getWebSocketManager()
    manager.send(connection.id, message)
}

export const disconnection_handler = (connection: WSConnection) => {
    console.log("Client left:", connection.id)
}
