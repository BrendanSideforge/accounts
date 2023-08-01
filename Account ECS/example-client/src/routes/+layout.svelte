
<script lang="ts">

    import { onMount } from "svelte";
    import axios from "axios";
    import { auth_state } from "../store";

    onMount(async () => {

        const account_data = await axios.get("http://localhost:3001/accounts/account-data", { withCredentials: true });

        if (!account_data.data.found) return;

        $auth_state = account_data.data;

    })

</script>

<main>
    <slot />
</main>
