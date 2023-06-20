import React  from "react";
import { useAuth } from "./auth";

function LogoutPage() {

    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    }

    return (
        <>
            <h1>Logout</h1>

            <form action="" onSubmit={logout}>
                <label>Are you sure do you want to log out?</label>
                <br />
                <button type="submit">Log out</button>
            </form>
        </>
    );
}

export { LogoutPage }