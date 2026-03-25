<script lang="ts">
    import type { PageProps } from "./$types";

    import TextInput from "../../components/inputs/TextInput.svelte";
    import PasswordInput from "../../components/inputs/PasswordInput.svelte";
    import PrimaryButton from "../../components/inputs/PrimaryButton.svelte";

    let { form }: PageProps = $props();
</script>
<form class="form-wrapper" method="POST" action="?/login">
    <div class="section">
        <h1>Log into LibrerIA</h1>
        <p>Your local and fully private AI assistant</p>
    </div>
    <div class="section">
        <TextInput value={form?.username ?? ''} placeholder="Username" error={form?.username_error}/>
        <PasswordInput value="" placeholder="Password" error={form?.password_error}/>
    </div>
    <div class="section">
        <PrimaryButton label="Log in" call={() => {}}/>
        {#if form?.validation_error}
            <p class="error-message">{form?.validation_error}</p>
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
