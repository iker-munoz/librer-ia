<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";

    import { v4 as Uuid } from "uuid";
    import { faLightbulb, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

    import { conversations_state } from "$lib/state/conversations.svelte";

    import { Role } from "$lib/enums/role";
    import type { Conversation } from "$lib/schemas/conversation";
    import type { Message } from "$lib/schemas/message";

    import CheckboxInput from "../../../../components/inputs/CheckboxInput.svelte";
    import PrimaryButton from "../../../../components/inputs/PrimaryButton.svelte";
    import ConversationMessage from "../../../../components/ConversationMessage.svelte";

    import type { PageProps } from "./$types";
    import type { ActionResult } from "@sveltejs/kit";

    let { data }: PageProps = $props();
    let conversation: Conversation | undefined = $state();
    let content: string = $state("");
    let content_input: HTMLTextAreaElement | undefined = $state();
    let socket: WebSocket | null = null;
    let is_connected: boolean = false;
    let is_loading: boolean = $state(false);

    const send_message = ({ formData }: { formData: FormData }) => {
        formData.append("conversation", JSON.stringify(conversation))
        if (data.conversation_exists) formData.append("conversation_exists", "on");
        content = ""

        return async ({ result }: { result: ActionResult }) => {
            if (result.type != "success") return
            if (!data.conversation_exists) {
                conversations_state.conversations.push(result.data!.conversation)
                data.conversation_exists = true;
            }
            conversation = result.data!.conversation;
            if (socket && is_connected) { socket.send(JSON.stringify({
                conversation: conversation!,
                reasoning: conversations_state.reasoning_active
            })) }
        }
    }

    $effect(() => { conversation = JSON.parse(data.conversation_string) })
    $effect(() => {
        if (!content_input) return;
        content;
        content_input.style.height = "40px";
        content_input.style.height = `${content_input.scrollHeight}px`;
    })

    onMount(() => {
        socket = new WebSocket(`ws://${window.location.host}/ws`)
        socket.onopen = () => { is_connected = true }
        socket.onclose = () => { is_connected = false }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            is_loading = !data.done
            let conversation_last_message: Message = conversation!.messages[conversation!.messages.length - 1];
            if (conversation_last_message.role == Role.USER) {
                conversation!.messages.push({
                    uuid: Uuid(),
                    role: Role.ASSISTANT,
                    content: data.message.content,
                    thinking: data.message.thinking,
                    creation_timestamp: new Date().getTime()
                })
                return;
            }

            if (data.message.content) conversation_last_message.content += data.message.content
            if (data.message.thinking) conversation_last_message.thinking += data.message.thinking
            if (data.total_duration) conversation_last_message.generation_speed += data.total_duration
        }
    })
</script>

{#if conversation}
    <div class="conversation-messages">
        {#each conversation.messages as message }
            <ConversationMessage {message}/>
        {/each}
    </div>
    <form class="conversation-form" method="POST" use:enhance={send_message}>
        <textarea bind:this={content_input} name="content" class="message-input" bind:value={content} placeholder="Ask me anything!"></textarea>
        <div class="message-controls">
            <CheckboxInput bind:is_selected={conversations_state.reasoning_active} icon={faLightbulb} name="reasoning"/>
            <PrimaryButton icon={faPaperPlane} disabled={content == '' || is_loading} call={() => {}}/>
        </div>
    </form>
{/if}

<style>
    .conversation-messages {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 20px;
        flex-grow: 1;
        flex-shrink: 1;
        overflow-y: scroll;
        scrollbar-width: none;
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
