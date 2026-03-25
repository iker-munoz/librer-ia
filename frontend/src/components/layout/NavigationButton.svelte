<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    let {
        label,
        icon,
    }: {
        label: string,
        icon: IconDefinition,
    } = $props();

    const getLink = function(): string {
        const link: string = label.replace(" ", "_").toLowerCase();
        return `/${link}`
    }

    const isCurrent = function(): boolean {
        return page.url.pathname == getLink();
    }
</script>

<button class={isCurrent()? 'current': ''} onclick={() => { goto(getLink()) }}>
    <Fa {icon}/>
    <p>{label}</p>
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
    }

    button:hover {
        background-color: #151515;
    }

    button.current {
        background-color: #202020;
        color: #F0F0F0;
        font-weight: 600;
    }
</style>
