<script lang="ts">
    import type { User } from "$lib/schemas/user";
    import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
    import SecondaryButton from "../inputs/SecondaryButton.svelte";
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";

    let { current_user }: { current_user: User } = $props();
</script>

<div class="user-card">
    <div class="user">
        <p class="username">{current_user.username}</p>
        <p class="permissions">{current_user.permissions}</p>
    </div>
    <form action="/login?/logout" method="POST" use:enhance={() => {return async () => {goto("/login")}}}>
        <SecondaryButton icon={faArrowRightFromBracket} call={() => {}}/>
    </form>
</div>

<style>
    .user-card {
        width: 100%;
        height: 60px;
        padding: 0px 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 10px;

        .user {
            flex-grow: 1;
            max-width: 290px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;

            .username {
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .permissions {
                font-size: 14px;
                color: #909090;
            }
        }
    }
</style>
