
<script lang="ts">

    import axios from "axios";
    import { auth_state } from "../store";
    import { supabase } from "../supabase";


    let form_data = {
        email: '',
        password: ''
    }

    const login = async () => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: form_data.email,
            password: form_data.password
        });
        console.log(data, error);

        $auth_state = data

    }

    const signup = async () => {

        const { data, error } = await supabase.auth.signUp({
            email: form_data.email,
            password: form_data.password,
            options: {
                data: {
                    total_vt_credits: 0,
                    phone_number: 0,
                    created_at: new Date(),
                    subscription_tier_level: 0 // 0-4
                }
            }
        });
        console.log(data, error);

        $auth_state = data

    }

    const logout = async () => {

        await supabase.auth.signOut();
        
        $auth_state = {};

    }

</script>

{ #if !$auth_state.session }
    <input type="text" bind:value={ form_data.email } placeholder="email">
    <input type="text" bind:value={ form_data.password } placeholder="password">
    <button on:click={ () => { login() } }>Login</button>
    <button on:click={ () => { signup() }}>Create Account</button>
{ :else }
    <p>Email: { $auth_state.session.user.email }</p>
    <p>ID: { $auth_state.session.user.id } </p>
    <p>Last Sign In: { $auth_state.session.user.last_sign_in_at }</p>
    <p>VT Credits: { $auth_state.session.user.user_metadata.total_vt_credits }</p>
    <p>Phone Number: { $auth_state.session.user.user_metadata.phone_number }</p>
    <p>Subscription Tier: { $auth_state.session.user.user_metadata.subscription_tier_level }</p>
    <p>Created At: { $auth_state.session.user.user_metadata.created_at }</p>
    <button on:click={ () => { logout() }}>Logout</button>
{/if}
