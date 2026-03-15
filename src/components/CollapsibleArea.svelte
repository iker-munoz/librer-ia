<script lang="ts">
    import type { Snippet } from "svelte";

    import Fa from "svelte-fa";
    import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


    let {
        label,
        children_count,
        empty_information,
        children
    }: {
        label: string,
        children_count: number,
        empty_information: string,
        children: Snippet
    } = $props();

    let is_open: boolean = $state(true);

</script>

<div class="area {is_open? 'open': 'closed'}">
    <button onclick={() => { is_open = !is_open }}>
        <p>{label}</p>
        <Fa icon={faChevronDown} style="rotate: {is_open? '0deg': '90deg'}"/>
    </button>
    {#if children_count == 0}
        <div class="no-elements">
            <p>{empty_information}</p>
        </div>
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

    .no-elements {
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        border: 2px solid #202020;
        border-style: dashed;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            max-width: 240px;
            font-size: 14px;
            color: #505050;
            text-align: center;
        }
    }

    .elements {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>
