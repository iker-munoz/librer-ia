<script lang="ts">
    import { faFileInvoice, faList, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

    import NavigationButton from "./NavigationButton.svelte";

    import CollapsibleArea from "./CollapsibleArea.svelte";
    import ConversationQuickRedirectButton from "./ConversationQuickRedirectButton.svelte";
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
            children_count={1}
            empty_information="Your favorite conversations will appear here">
            p
        </CollapsibleArea>
        <CollapsibleArea
            label="Recents" 
            children_count={1}
            empty_information="Your recent conversations will appear here">
            p
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
