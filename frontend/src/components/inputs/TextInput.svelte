<script lang="ts">
    import Fa from "svelte-fa";
    import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
    
    let {
        value = $bindable(),
        placeholder,
        icon,
        error
    }: {
        value: string,
        placeholder: string,
        icon?: IconDefinition,
        error?: string
    } = $props();

</script>

<div class="input-wrapper">
    <input name={placeholder.toLowerCase()} class="input {icon? 'has-icon': ''} {error? 'has-error': ''}" bind:value={value} {placeholder}>
    {#if icon}
        <div class="icon-wrapper">
            <Fa {icon}/>
        </div>
    {/if}
    {#if error}
        <p class="error-message">{error}</p>
    {/if}
</div>

<style>
    .input-wrapper {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 5px;
        position: relative;

        .input {
            width: 100%;
            height: 40px;
            background-color: transparent;
            padding: 0px 10px;
            box-sizing: border-box;
            border: 1px solid #505050;
            border-radius: 5px;
            color: #F0F0F0;
            font-size: 14px;
        }
        .input::placeholder { color: #505050; }
        .input.has-icon { padding-right: 35px; }
        .input.has-error { border-color: #FF8080; }
        .input:focus { outline: none; }

        .icon-wrapper {
            width: 15px;
            height: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 12px;
            right: 10px;
            font-size: 15px;
            color: #505050;
            pointer-events: none;
        }

        .error-message {
            font-size: 14px;
            color: #FF8080;
        }
    }
</style>
