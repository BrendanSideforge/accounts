import { writable } from "svelte/store";

export const auth_state: any = writable({
    session: null
});
