import type { User } from "$lib/schemas/user";
import { DB } from "./setup";

export const get_user_with_credentials = async function(username: string, password_hash: string): Promise<User> {
     const [user] = await DB.query<[User]>(
        "( SELECT * FROM user WHERE username = $username AND password_hash = $password_hash )[0];",
        { username, password_hash }
    );
    return user
}
