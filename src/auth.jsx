import React, { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const adminsList = ['toxe','Carlos', 'Ed'];

const editorsList = ['CharlesDickens', 'PeterParker', 'KingEditor'];

const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const login = ({ username }) => {
        const isAdmin = adminsList.find(admin => admin === username)
        const isEditor = editorsList.find(editor => editor === username)
        setUser({ username, isAdmin, isEditor });

        const path = location.state?.from?.pathname || '/profile';
        return navigate(path, { replace: true })
    }

    const logout = () => {
        setUser(null);
        navigate('/')
    }

    const auth = { user, login, logout } 

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}

function AuthRoute(props) {
    const auth = useAuth();
    const location = useLocation();

    <Navigate to='/login' state={{ from: location }} replace />

    if (!auth.user) {
        return <Navigate to="/login" />
    }

    return props.children;
}

export {
    AuthProvider,
    AuthRoute,
    useAuth,
}