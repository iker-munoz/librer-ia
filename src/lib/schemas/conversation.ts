import type { RecordId } from "surrealdb"
import type { Message } from "./message"

export type Conversation = {
    id: RecordId,
    title: string,
    is_favorite: boolean,
    creation_timestamp: number,
    last_message_timestamp: number,
    messages: Message[]
}
