
<script lang="ts">

    import { onMount } from "svelte";
    import { auth_state } from "../store";
    import { supabase } from "../supabase";

    onMount(async () => {

        const session = ((await supabase.auth.getSession()).data.session);

        console.log(session);
        $auth_state.session = session;

        supabase.auth.onAuthStateChange(
            async (_event, session) => {
                switch(_event) {
                    case "SIGNED_IN":
                        $auth_state = session;
                        break;
                    case "SIGNED_OUT":
                        $auth_state = {};
                        break;
                    default:
                        break;
                }
            }
        )
    })

</script>

<main>
    <slot />
</main>
