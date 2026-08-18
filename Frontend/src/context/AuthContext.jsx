import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
} from "../api/auth.api.js";
import { setAccessToken } from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        // On a fresh page load there's no access token in memory yet, but a
        // refresh-token cookie may still be valid - use it to restore the
        // session silently before rendering anything gated by auth.
        (async () => {
            try {
                const { accessToken } = await refreshAccessToken();
                setAccessToken(accessToken);
                const me = await getCurrentUser();
                setUser(me);
            } catch {
                setAccessToken(null);
                setUser(null);
            } finally {
                setInitializing(false);
            }
        })();
    }, []);

    const login = useCallback(async (payload) => {
        const data = await loginUser(payload);
        setAccessToken(data.accessToken);
        setUser(data.user);
        return data.user;
    }, []);

    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    }, []);

    const refreshCurrentUser = useCallback(async () => {
        const me = await getCurrentUser();
        setUser(me);
        return me;
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, setUser, initializing, login, logout, refreshCurrentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
