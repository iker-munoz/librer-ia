<script lang="ts">
    import { onMount } from "svelte";

    import { faFileInvoice, faList, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

    import NavigationButton from "./NavigationButton.svelte";

    import { app_state } from "../lib/state/app.svelte";
    import CollapsibleArea from "./CollapsibleArea.svelte";

    onMount(() => {
        app_state.updateConversations()
        console.log(app_state.getRecentConversations())
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
    <div class="quick_access">
        <CollapsibleArea label="Favorites">
            {#each app_state.getFavoriteConversations() as conversation }
                <p>{conversation.id}</p>
            {/each}
        </CollapsibleArea>
        <CollapsibleArea label="Recents">
            {#each app_state.getRecentConversations() as conversation }
                <p>{conversation.id}</p>
            {/each} 
        </CollapsibleArea>
    </div>
</div>

<style>
    .navbar {
        width: 400px;
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

    .quick_access {
        width: 100%;
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
