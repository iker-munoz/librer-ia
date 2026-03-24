<script lang="ts">
    import { enhance } from "$app/forms";
    
    import { faLightbulb, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

    import { conversations_state } from "$lib/state/conversations.svelte";

    import type { Conversation } from "$lib/schemas/conversation";

    import CheckboxInput from "../../../../components/inputs/CheckboxInput.svelte";
    import PrimaryButton from "../../../../components/inputs/PrimaryButton.svelte";

    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let conversation: Conversation | undefined = $state();
    let content: string = $state("");
    let content_input: HTMLTextAreaElement | undefined = $state();

    $effect(() => { conversation = JSON.parse(data.conversation_string) })
    $effect(() => {
        if (!content_input) return;
        content;
        content_input.style.height = "40px";
        content_input.style.height = `${content_input.scrollHeight}px`;
    })
</script>

{#if conversation}
    <div class="conversation-messages"></div>
    <form class="conversation-form" method="POST" use:enhance={({ formData }) => {
            console.log(formData)
            formData.append("conversation", JSON.stringify(conversation))
            if (data.conversation_exists) formData.append("conversation_exists", "on")

            return async ({ result, update }) => {
                console.log(result)
            }
        }}>
        <textarea bind:this={content_input} name="content" class="message-input" bind:value={content} placeholder="Ask me anything!"></textarea>
        <div class="message-controls">
            <CheckboxInput is_selected={conversations_state.reasoning_active} icon={faLightbulb} name="reasoning"/>
            <PrimaryButton icon={faPaperPlane} call={() => {}}/>
        </div>
    </form>
{/if}

<style>
    .conversation-messages {
        width: 100%;
        flex-grow: 1;
        background-color: red;
    }

    .conversation-form {
        width: 100%;
        height: fit-content;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #202020;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .message-input {
            width: 100%;
            height: 40px;
            max-height: 300px;
            background-color: transparent;
            margin: 0px;
            padding: 12px 0px;
            box-sizing: border-box;
            border: 0px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #F0F0F0;
            resize: none;
        }

        .message-input::placeholder {
            color: #505050;
        }

        .message-input:focus {
            outline: none;
        }

        .message-controls {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
