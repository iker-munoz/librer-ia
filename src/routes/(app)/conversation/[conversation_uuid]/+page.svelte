<script lang="ts">
    import type { Conversation } from "$lib/schemas/conversation";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let conversation: Conversation | undefined = $state();

    $effect(() => { conversation = JSON.parse(data.conversation_string) })
</script>

{#if conversation}
    <p>{conversation.uuid}</p>
{/if}
