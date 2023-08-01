
<script>

    import axios from "axios";
    import { auth_state } from "../store";

    let form_data = {
        email: '',
        password: ''
    }
    // @ts-ignore
    let data_response = null;

    const login = async () => {

       data_response = (await axios.post("http://localhost:3001/accounts/login", {
            email: form_data.email,
            password: form_data.password
        }, { withCredentials: true })).data
        
        $auth_state = data_response

    }

    const logout = async () => {

        await axios.post("http://localhost:3001/accounts/logout", {}, { withCredentials: true });
        $auth_state = {};

    }

</script>

{ #if Object.keys($auth_state).length === 0}
    <input type="text" bind:value={ form_data.email } placeholder="email">
    <input type="text" bind:value={ form_data.password } placeholder="password">
    <button on:click={ () => { login() } }>Login</button>
{ :else }
    <p>{ JSON.stringify($auth_state) }</p>
    <button on:click={ () => { logout() }}>Logout</button>
{/if}
