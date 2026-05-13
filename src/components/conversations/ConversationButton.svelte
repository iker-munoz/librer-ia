<script lang="ts">
    import { goto } from "$app/navigation";

    import type { Conversation } from "$lib/schemas/conversation";
    import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
    import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
    import Fa from "svelte-fa";
    import { enhance } from "$app/forms";
    import { conversations_state } from "$lib/state/conversations.svelte";

    let { conversation }: { conversation: Conversation } = $props();

    const getLink = function(): string {
        return `/conversation/${conversation.uuid}`
    }

    const favorite_conversation = ({ formData }: { formData: FormData }) => {
        formData.append("conversation", JSON.stringify(conversation));
        return async () => {
            conversations_state.set_favorite(conversation.uuid, !conversation.is_favorite);
        }
    }

    const delete_conversation = ({}) => {
        return async () => {}
    }
</script>

<div class="btn">
    <form action="?/favorite" method="POST" use:enhance={favorite_conversation}>
        <button>
            <Fa icon={conversation.is_favorite? faStar: faEmptyStar}/>
        </button>
    </form>
    <button onclick={() => goto(getLink())}>
        <p>{conversation.title}</p>
    </button>
    <form action="?/delete" method="POST" use:enhance={delete_conversation}>
        <button>
            <Fa icon={faTimes}/>
        </button>
    </form>
</div>

<style>
    .btn {
        width: 100%;
        height: 40px;
        padding: 0px 10px;
        box-sizing: border-box;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        cursor: pointer;

        button {
            flex-grow: 1;
            height: 40px;
            padding: 0px;
            background-color: transparent;
            text-align: start;
            color: #909090;
            border: 0px;
            cursor: pointer;
        }

        form {
            width: 16px;
            height: 16px;
            display: flex;
            justify-content: center;
            align-items: center;

            button {
                font-size: 16px;
            }
        }
    }

    .btn:hover {
        background-color: #151515;
    }
</style>
