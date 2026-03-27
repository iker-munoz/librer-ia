import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer } from 'sveltekit-ws';
import { defineConfig } from 'vite';

import { connection_handler, disconnection_handler, message_handler } from "./src/websocket"

export default defineConfig({
	plugins: [
        webSocketServer({
            path: "/ws",
            handlers: {
                onConnect: connection_handler,
                onMessage: message_handler,
                onDisconnect: disconnection_handler
            }
        }),
        sveltekit()
    ],
    server: {
        port: 8000,
        strictPort: true
    }
});
