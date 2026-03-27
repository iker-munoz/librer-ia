import { getWebSocketManager, WebSocketManager } from "sveltekit-ws";
import type { WSConnection, WSMessage } from "sveltekit-ws";

import { INFERENCE } from "./inference";
import type { WSMessageData } from "./schemas";

export const connection_handler = (connection: WSConnection) => {
    console.log("Client connection:", connection.id)
}

export const message_handler = async (connection: WSConnection, message: WSMessage) => {
    const message_data: WSMessageData = message as unknown as WSMessageData
    const respose = await INFERENCE.chat({
        model: "librer-ia",
        messages: message_data.messages,
        think: message_data.think,
        stream: true
    })
    
    const manager: WebSocketManager = getWebSocketManager()
    for await (const part of respose) {
        manager.send(connection.id, part as unknown as WSMessage)
    }
    
}

export const disconnection_handler = (connection: WSConnection) => {
    console.log("Client left:", connection.id)
}
