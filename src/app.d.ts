import type { User } from "$lib/schemas/user";

declare global {
	namespace App {
		// interface Error {}
		interface Locals { user?: User }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
