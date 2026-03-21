import type { Conversation } from "$lib/schemas/conversation";

class ConversationsState {
    conversations: Conversation[] = $state([]);
    favorite_conversations: Conversation[] = $derived(this.conversations.filter(conversation => conversation.is_favorite));
    recent_conversations: Conversation[] = $derived(this.conversations.slice(0, 10));
    reasoning_active: boolean = $state(false);

    load_conversations = async (user_conversations: Conversation[]) => {
        this.conversations = user_conversations;
    }
}

export const conversations_state: ConversationsState = new ConversationsState();
