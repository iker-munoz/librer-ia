import type { Conversation } from "../schemas/conversation";

class ConversationsState {
    conversations: Conversation[] = $state([])
    favorite_conversations: Conversation[] = $derived(
        this.conversations.filter(c => c.is_favorite)
    )
    recent_conversations: Conversation[] = $derived(
        this.conversations.slice(0, 10)
    )

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
                is_favorite: false,
                creation_timestamp: 1,
                last_message_timestamp: 1,
                messages: []
            }
        ]
    }
}

export const conversations_state = new ConversationsState();
conversations_state.updateConversations();
