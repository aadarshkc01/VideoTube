import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api/v1";

export const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Access token kept in memory only (never localStorage) so it can't be
// lifted by an XSS payload; it's re-fetched from the refresh endpoint
// (which reads the httpOnly cookie) whenever the app reloads.
let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

let refreshPromise = null;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const isAuthRoute = originalRequest?.url?.includes("/users/login") ||
            originalRequest?.url?.includes("/users/refresh-token");

        if (status === 401 && !originalRequest._retry && !isAuthRoute) {
            originalRequest._retry = true;
            try {
                // Coalesce concurrent 401s into a single refresh call.
                refreshPromise =
                    refreshPromise ||
                    api.post("/users/refresh-token").finally(() => {
                        refreshPromise = null;
                    });
                const { data } = await refreshPromise;
                setAccessToken(data?.data?.accessToken || null);
                return api(originalRequest);
            } catch (refreshError) {
                setAccessToken(null);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const unwrap = (promise) => promise.then((res) => res.data.data);
