import { getWebSocketManager, WebSocketManager } from "sveltekit-ws";
import type { WSConnection, WSMessage } from "sveltekit-ws";

export const connection_handler = (connection: WSConnection) => {
    console.log("Client connection:", connection.id)
}

export const message_handler = (connection: WSConnection, message: WSMessage) => {
    console.log("Message", message)
    const manager: WebSocketManager = getWebSocketManager()
    manager.send(connection.id, message)
}

export const disconnection_handler = (connection: WSConnection) => {
    console.log("Client left:", connection.id)
}
