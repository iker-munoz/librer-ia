<script lang="ts">
    import Fa from "svelte-fa";
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

    let {
        label,
        icon,
        call
    }: {
        label?: string,
        icon?: IconDefinition
        call: () => void
    } = $props();
</script>

<button class="btn {label? '': 'no-label'}" onclick={call}>
    <p class="label">{label}</p>
    {#if icon}
        <div class="icon-wrapper">
            <Fa {icon}/>
        </div>
    {/if}
</button>

<style>
    .btn {
        width: 100%;
        height: 40px;
        background-color: #F0F0F0;
        border: 0px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .label { font-weight: 600; }

        .icon-wrapper {
            font-size: 15px;
            color: #101010;
        }
    }
    .btn.no-label { width: 40px; }
    .btn:hover { background-color: #E0E0E0; }
</style>
