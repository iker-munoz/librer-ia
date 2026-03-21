<script lang="ts">
    import { faLightbulb, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
    import PrimaryButton from "./PrimaryButton.svelte";
    import CheckboxInput from "./CheckboxInput.svelte";
    import { conversations_state } from "$lib/state/conversations.svelte";

    let user_message: string = $state("");
    
    let resizable_text_area: HTMLTextAreaElement;
    let resize_text_area = function() {
        resizable_text_area.style.height = "40px";
        resizable_text_area.style.height = `${resizable_text_area.scrollHeight}px`;
    }

    $effect(() => {
        user_message;
        resize_text_area()
    });
</script>

<form class="message-form-wrapper" method="POST">
    <textarea name="message"
      placeholder="Ask me anything!"
      bind:this={resizable_text_area}
      bind:value={user_message}></textarea>
    <div class="buttons-wrapper">
        <CheckboxInput bind:is_selected={conversations_state.reasoning_active} icon={faLightbulb} name="reasoning"/>
        <PrimaryButton icon={faPaperPlane}  disabled={user_message.trim() == ""} call={() => {}}/>
    </div>
</form>

<style>
    .message-form-wrapper {
        width: 100%;
        height: fit-content;
        padding: 20px;
        border: 1px solid #202020;
        box-sizing: border-box;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    textarea {
        width: 100%;
        height: 40px;
        max-height: 300px;
        margin: 0px;
        padding: 10px 0px;
        box-sizing: border-box;
        border: none;
        background-color: transparent;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
        color: #F0F0F0;
        resize: none;
    }
    textarea::placeholder { color: #505050; }
    textarea:focus { outline: none; }

    .buttons-wrapper {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
