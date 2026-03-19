<script lang="ts">
    import TextInput from "../../../components/inputs/TextInput.svelte";
    import PasswordInput from "../../../components/inputs/PasswordInput.svelte";

    let username: string = $state("");
    let username_error: string = $state("");
    let password: string = $state("");
    let password_error: string = $state("");
</script>
<div class="form-wrapper">
    <div class="section">
        <h1>Log into LibrerIA</h1>
        <p>Your local and fully private AI assistant</p>
    </div>
    <div class="section">
        <TextInput value={username} placeholder="Username" error={username_error}/>
        <PasswordInput value={password} placeholder="Password" error={password_error}/>
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
        }
    }
</style>
