import { api, unwrap } from "./axios.js";

export const registerUser = (formData) =>
    unwrap(
        api.post("/users/register", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    );

export const loginUser = (payload) => unwrap(api.post("/users/login", payload));

export const logoutUser = () => unwrap(api.post("/users/logout"));

export const refreshAccessToken = () => unwrap(api.post("/users/refresh-token"));

export const getCurrentUser = () => unwrap(api.get("/users/current-user"));

export const changePassword = (payload) =>
    unwrap(api.post("/users/change-password", payload));

export const updateAccountDetails = (payload) =>
    unwrap(api.patch("/users/update-account", payload));

export const updateAvatar = (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return unwrap(
        api.patch("/users/avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    );
};

export const updateCoverImage = (file) => {
    const formData = new FormData();
    formData.append("coverImage", file);
    return unwrap(
        api.patch("/users/cover-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    );
};

export const getChannelProfile = (username) =>
    unwrap(api.get(`/users/c/${username}`));

export const getWatchHistory = () => unwrap(api.get("/users/history"));
