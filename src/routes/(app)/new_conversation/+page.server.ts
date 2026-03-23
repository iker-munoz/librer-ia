import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

import { v4 as Uuid } from "uuid";

export const load: PageServerLoad = async() => {
    const random_conversation_uuid: string = Uuid();
    redirect(307, `/conversation/${random_conversation_uuid}`)
}
