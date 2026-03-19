import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../(app)/$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.user) redirect(307, "/login")
    redirect(307, "/new_conversation")
}
