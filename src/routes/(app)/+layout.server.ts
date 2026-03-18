import { redirect, type Cookies } from "@sveltejs/kit";

export function load ({ cookies }: { cookies: Cookies }) {
    const current_user = cookies.get("current_user");
    
    if (!current_user) {
        redirect(307, "/login")
    }

    return {
        current_user
    }
}
