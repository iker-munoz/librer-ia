import type { Conversation } from "../schemas/conversation";

class ConversationsState {
    conversations: Conversation[] = $state([])
    favorite_conversations: Conversation[] = $derived(this.conversations.filter(c => c.is_favorite))
    recent_conversations: Conversation[] = $derived(this.conversations.slice(0, 10));

    refresh_conversations() {}
}

export const conversations_state = new ConversationsState();
