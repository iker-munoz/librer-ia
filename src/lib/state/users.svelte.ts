import type { User } from "$lib/schemas/user";

class UsersState {
    users: User[] = $state([]);
    current_user?: User = $state();

    refresh_users() {}

    async login(username: string, password: string) {}

    logout() { this.current_user = undefined; }
}

export const users_state = new UsersState();
