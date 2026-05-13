<script lang="ts">
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import TextInput from "../../../components/inputs/TextInput.svelte";
    import type { Conversation } from "$lib/schemas/conversation";
    import { conversations_state } from "$lib/state/conversations.svelte";

    let search_input: string = $state("");
    let filtered_conversations: Conversation[] = $derived(conversations_state.conversations.filter(
        conversation => conversation.title.toLowerCase().includes(search_input.toLowerCase())
    ));
</script>

<div class="content">
    <div class="header">
        <h1>Conversations</h1>
        <TextInput bind:value={search_input} placeholder="Search" icon={faSearch}/>
    </div>
    <div class="elements">
        {#each filtered_conversations as conversation}
            <p>{conversation.title}</p>
        {/each}
    </div>
</div>

<style>
    .content {
        width: 100%;
        height: 100%;
        padding: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .header {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .elements {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
</style>
