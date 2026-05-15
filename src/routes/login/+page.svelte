<script lang="ts">
    import TextInput from "../../components/inputs/TextInput.svelte";
    import PasswordInput from "../../components/inputs/PasswordInput.svelte";
    import PrimaryButton from "../../components/inputs/PrimaryButton.svelte";
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { ActionResult } from "@sveltejs/kit";

    let username: string = $state("");
    let username_error: string = $state("");
    let password_error: string = $state("");
    let validation_error: string = $state("");

    const login = () => {
        return async ({ result }: { result: ActionResult }) => {
            console.log(result);
            if (result.type == "success") {
                goto("/new_conversation");
                return
            }

            if (result.type != "failure") return
            username = result.data?.username ?? "";
            username_error = result.data?.username_error ?? "";
            password_error = result.data?.password_error ?? "";
            validation_error = result.data?.validation_error ?? "";
        }
    }
</script>
<form class="form-wrapper" action="?/login" method="POST" use:enhance={login}>
    <div class="section">
        <h1>Log into LibrerIA</h1>
        <p>Your local and fully private AI assistant</p>
    </div>
    <div class="section">
        <TextInput value={username} placeholder="Username" error={username_error}/>
        <PasswordInput value="" placeholder="Password" error={password_error}/>
    </div>
    <div class="section">
        <PrimaryButton label="Log in" call={() => {}}/>
        {#if validation_error}
            <p class="error-message">{validation_error}</p>
        {/if}
    </div>
</form>

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
        justify-content: center;
        align-items: center;
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

    .form-wrapper {
        width: 600px;
        height: fit-content;
        padding: 50px;
        box-sizing: border-box;
        border: 1px solid #202020;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .section {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .error-message {
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: #FF8080;
            }
        }
    }
</style>
