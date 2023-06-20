import React, { useState }  from "react";
import { useAuth } from "./auth";
import { Navigate, useLocation } from "react-router-dom";

function LoginPage() {
    const auth = useAuth();
    const [username, setUsername] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.login({username});
    }

    if (auth.user) {
        return <Navigate to="/profile" />
    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={login}>
                <label>Type your username:</label>
                <br />
                <input 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <br />
                <br />
                <button type="submit">Log in</button>
            </form>
        </>
    );
}

export { LoginPage }