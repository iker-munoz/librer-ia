import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    cookies.delete("current_user", { path: "/" })
}
