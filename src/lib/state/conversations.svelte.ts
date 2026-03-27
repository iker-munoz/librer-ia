import type { Conversation } from "$lib/schemas/conversation";

class ConversationsState {
    conversations: Conversation[] = $state([]);
    sorted_conversations: Conversation[] = $derived(this.conversations.sort((a, b) => {
        return b.last_message_timestamp - a.last_message_timestamp
    }))
    favorite_conversations: Conversation[] = $derived(this.sorted_conversations.filter(conversation => conversation.is_favorite));
    recent_conversations: Conversation[] = $derived(this.sorted_conversations.slice(0, 10));
    reasoning_active: boolean = $state(false);

    load_conversations = async (user_conversations: Conversation[]) => {
        this.conversations = user_conversations;
    }
}

export const conversations_state: ConversationsState = new ConversationsState();
