<script lang="ts">
    import { onMount } from "svelte";

    import { faFileInvoice, faList, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

    import type { Conversation } from "$lib/schemas/conversation";
    import type { User } from "$lib/schemas/user";
    import { conversations_state } from "$lib/state/conversations.svelte";

    import NavigationButton from "./NavigationButton.svelte";
    import CollapsibleArea from "./CollapsibleArea.svelte";
    import ConversationQuickRedirectButton from "./ConversationQuickRedirectButton.svelte";
    import UserCard from "./UserCard.svelte";

    let {
        current_user,
        user_conversations_string
    }: {
        current_user: User,
        user_conversations_string: string
    } = $props();

    onMount(() => {
        const user_conversations: Conversation[] = JSON.parse(user_conversations_string);
        conversations_state.load_conversations(user_conversations);
    })
</script>

<div class="navbar">
    <h1>LibrerIA</h1>
    <hr>
    <div class="navigation">
        <NavigationButton label="New conversation" icon={faPlus}/>
        <NavigationButton label="Conversations" icon={faList}/>
        <NavigationButton label="Documents" icon={faFileInvoice}/>
        <NavigationButton label="Users" icon={faUser}/>
    </div>
    <hr>
    <div class="quick-access">
        <CollapsibleArea 
            label="Favorites" 
            children_count={conversations_state.favorite_conversations.length}
            empty_information="Your favorite conversations will appear here">
            {#each conversations_state.favorite_conversations as conversation}
                <ConversationQuickRedirectButton {conversation}/>
            {/each}
        </CollapsibleArea>
        <CollapsibleArea
            label="Recents" 
            children_count={conversations_state.recent_conversations.length}
            empty_information="Your recent conversations will appear here">
            {#each conversations_state.recent_conversations as conversation}
                <ConversationQuickRedirectButton {conversation}/>
            {/each}
        </CollapsibleArea>
    </div>
    <hr>
    <UserCard {current_user}/>
</div>

<style>
    .navbar {
        width: 400px;
        min-width: 400px;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .navigation {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .quick-access {
        width: 100%;
        flex-grow: 1;
        max-height: calc(100vh - 426px);
        padding: 0px 10px;
        flex-shrink: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 20px;
        overflow-y: scroll;
        scrollbar-width: none;
    }
</style>
