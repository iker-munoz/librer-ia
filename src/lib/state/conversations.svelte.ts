import type { Conversation } from "$lib/schemas/conversation";

class ConversationsState {
    conversations: Conversation[] = $state([]);
    sorted_conversations: Conversation[] = $derived(this.conversations.sort((a, b) => {
        return b.last_message_timestamp - a.last_message_timestamp
    }))
    favorite_conversations: Conversation[] = $derived(this.sorted_conversations.filter(conversation => conversation.is_favorite));
    recent_conversations: Conversation[] = $derived(this.sorted_conversations.slice(0, 10));
    reasoning_active: boolean = $state(false);

    load_conversations = (user_conversations: Conversation[]) => {
        this.conversations = user_conversations;
    }

    set_favorite = (conversation_uuid: string, favorite_state: boolean) => {
        let conversation_to_favorite = this.conversations.find(conversation => {
            return conversation.uuid == conversation_uuid
        })
        if (!conversation_to_favorite) return
        conversation_to_favorite.is_favorite = favorite_state;
    }
}

export const conversations_state: ConversationsState = new ConversationsState();
