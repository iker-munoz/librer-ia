import { redirect } from "@sveltejs/kit";
import { users_state } from "$lib/state/users.svelte";

export function load () {
    if (users_state.current_user) redirect(307, "/new_conversation")
}
