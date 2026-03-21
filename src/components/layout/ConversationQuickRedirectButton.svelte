<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    import type { Conversation } from "$lib/schemas/conversation";

    let { conversation }: { conversation: Conversation } = $props();

    const getLink = function(): string {
        return `/conversation/${conversation.uuid}`
    }

    const isCurrent = function(): boolean {
        return page.url.pathname == getLink();
    }
</script>

<button class={isCurrent()? 'current': ''} onclick={() => { goto(getLink()) }}>
    <p>{conversation.title}</p>
</button>

<style>
    button {
        width: 100%;
        height: 40px;
        background-color: transparent;
        padding: 0px 10px;
        box-sizing: border-box;
        border: 0px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #909090;
        font-size: 16px;
        cursor: pointer;

        p {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    button:hover {
        background-color: #151515;
    }

    button.current {
        background-color: #202020;
        color: #F0F0F0;
    }
</style>
