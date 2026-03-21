import type { PageLoad } from "./$types";

export const load: PageLoad = ({params}) => {
    return { conversation_uuid: params.conversation_uuid }
}
