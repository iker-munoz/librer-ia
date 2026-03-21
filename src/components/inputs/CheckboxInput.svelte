<script lang="ts">
    import Fa from "svelte-fa";
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

    let {
        is_selected = $bindable(),
        icon,
        name
    }: {
        is_selected: boolean,
        icon: IconDefinition,
        name: string
    } = $props();
</script>

<button class="btn {is_selected? 'selected': ''}" type="button" onclick={() => is_selected = !is_selected}>
    <div class="icon-wrapper">
        <Fa {icon}/>
    </div>
</button>
<input {name} type="checkbox" bind:checked={is_selected}>

<style>
    .btn {
        width: 40px;
        height: 40px;
        background-color: transparent;
        border: 0px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .icon-wrapper {
            font-size: 15px;
            color: #909090;
        }
    }
    .btn:hover { background-color: #202020; }
    .btn.selected {
        background-color: #202020;
        .icon-wrapper { color: #F0F0F0; }
    }

    input { display: none; }
</style>
