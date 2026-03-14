import type { Conversation } from "../schemas/conversation";

class AppState {
    user: string = "Hello" // TODO Swap with real use once login is done!
    conversations: Conversation[] = $state([])

    updateConversations() { // TODO Return the actual conversations once the database connection is done!
        this.conversations = [ 
            {
                id: "0000",
                title: "This is a test conversation",
                is_favorite: false,
                creation_timestamp: 0,
                last_message_timestamp: 0,
                messages: []
            },
            {
                id: "0001",
                title: "Another test",
                is_favorite: true,
                creation_timestamp: 1,
                last_message_timestamp: 1,
                messages: []
            }
        ]
    }

    getFavoriteConversations(): Conversation[] {
        return this.conversations
            .filter((c) => c.is_favorite);
    }

    getRecentConversations(): Conversation[] {
        return this.conversations
            .toSorted((a, b) => a.last_message_timestamp + b.last_message_timestamp)
            .slice(0, 10)
    }
}

export const app_state = new AppState();
