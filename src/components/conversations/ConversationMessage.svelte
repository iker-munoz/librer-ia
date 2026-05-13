<script lang="ts">
    import { Marked } from "marked";
    import { markedHighlight } from "marked-highlight";
    import hljs from "highlight.js";

    import type { Message } from "$lib/schemas/message";
    import "highlight.js/styles/obsidian.css"

    let {
        message
    }: {
        message: Message
    } = $props();

    const marked = new Marked(
        markedHighlight({
            emptyLangClass: "hljs",
            langPrefix: "hljs language-",
            highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang: "plaintext";
                return hljs.highlight(code, { language }).value;
            }
        })
    )
</script>

<div class={`message ${message.role}`}>
    {#if message.thinking}
        <div class="thinking-wrapper">
            <p class="thinking">{message.thinking}</p>
        </div>
    {/if}
    {@html marked.parse(message.content)}
</div>

<style>
    .message {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 10px;
        border-top-right-radius: 0px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    
        .thinking-wrapper {
            border-left: 1px solid #909090;
            padding-left: 10px;
            box-sizing: border-box;

            .thinking {
                font-size: 14px;
                color: #909090;
            }
        }

    }
    .message.user {
        width: fit-content;
        max-width: 600px;
        border: 1px solid #202020;
    }
</style>
