<script lang="ts">
    import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import type { Snippet } from "svelte";
    import Fa from "svelte-fa";

    let {
        label,
        children
    }: {
        label: string,
        children: Snippet
    } = $props();

    let is_open: boolean = $state(true);
</script>

<div class="area {is_open? 'open': 'closed'}">
    <button onclick={() => { is_open = !is_open }}>
        <p>{label}</p>
        <Fa icon={faChevronDown} style="rotate: {is_open? '0deg': '90deg'}"/>
    </button>
    {#if children.length == 0}
        <div class="no_elements"></div>
    {:else}   
        <div class="elements">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .area {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow: hidden;
    }

    .area.open {
        height: fit-content;
    }

    .area.closed {
        height: 20px;
    }

    button {
        width: 100%;
        height: 20px;
        background-color: transparent;
        padding: 0px;
        border: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: #F0F0F0;
        cursor: pointer;
    }
</style>
