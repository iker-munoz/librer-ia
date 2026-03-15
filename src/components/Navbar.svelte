<script lang="ts">
    import { faFileInvoice, faList, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

    import NavigationButton from "./NavigationButton.svelte";

    import { conversations_state } from "$lib/state/conversations.svelte"

    import CollapsibleArea from "./CollapsibleArea.svelte";
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
            empty_information="Your favorite conversations will appear here"
        >
            {#each conversations_state.favorite_conversations as conversation }
                <p>{conversation.id}</p>
            {/each}
        </CollapsibleArea>
        <CollapsibleArea
            label="Recents" 
            children_count={conversations_state.recent_conversations.length}
            empty_information="Your recent conversations will appear here"
        >
            {#each conversations_state.recent_conversations as conversation }
                <p>{conversation.id}</p>
            {/each} 
        </CollapsibleArea>
    </div>
    <hr>
    
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
