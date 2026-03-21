<script lang="ts">
    import type { LayoutProps } from './$types';

    import Navbar from '../../components/layout/Navbar.svelte';

    let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
    <title>LibrerIA</title>
</svelte:head>
<Navbar current_user={data.current_user} user_conversations_string={data.user_conversations_string}/>
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
        color: #F0F0F0;
    }

    :global(body) {
        display: flex;
    }

    :global(h1) {
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
