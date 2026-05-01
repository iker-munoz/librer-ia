<script lang="ts">
    import type { LayoutProps } from './$types';

    import Navbar from '../../components/layout/Navbar.svelte';
    import type { Conversation } from '$lib/schemas/conversation';

    let { data, children }: LayoutProps = $props();
    let user_conversations: Conversation[] = $derived(JSON.parse(data.user_conversations_string));
</script>

<svelte:head>
    <title>LibrerIA</title>
</svelte:head>
<Navbar current_user={data.current_user} {user_conversations}/>
<div class="content-wrapper">
    <div class="content">
        {@render children()}
    </div>
</div>

<style>
    :global(html, body) {
        width: 100vw;
        height: 100vh;
        padding: 0px;
        margin: 0px;
        background-color: #101010;
        color: #f0f0f0;
    }

    :global(body) {
        display: flex;
    }

    :global(h1, h2, h3, h4, h5, h6) {
        margin: 0px;
        font-size: 24px;
        font-weight: 600;
    }

    :global(p) {
        margin: 0px;
        font-size: 16px;
    }

    :global(hr) {
        width: 100%;
        height: 1px;
        background-color: #202020;
        border: 0px;
        margin: 0px;
    }

    :global(ul, ol) {
        margin: 0px;
        font-size: 16px;
    }

    :global(pre) {
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #202020;
        border-radius: 10px;
    }

    :global(code) {
        padding: 0px !important;
        background-color: transparent !important;
    }

    :global(table, th, tr, td) {
        border: 1px solid #202020;
        border-collapse: collapse;
        text-align: start;
        padding: 5px;
    }

    :global(a) {
        color: #80FF80;
    }

    :global(a:visited) {
        color: #508050;
    }

    .content-wrapper {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        margin: 10px;
        padding: 50px;
        box-sizing: border-box;
        border: 1px solid #202020;
        border-radius: 10px;
        display: flex;
        justify-content: center;

        .content {
            flex-grow: 1;
            max-width: 1000px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
    }
</style>
