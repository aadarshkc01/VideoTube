import { api, unwrap } from "./axios.js";

export const createPlaylist = (payload) => unwrap(api.post("/playlist", payload));

export const getUserPlaylists = (userId) =>
    unwrap(api.get(`/playlist/user/${userId}`));

export const getPlaylistById = (playlistId) =>
    unwrap(api.get(`/playlist/${playlistId}`));

export const updatePlaylist = (playlistId, payload) =>
    unwrap(api.patch(`/playlist/${playlistId}`, payload));

export const deletePlaylist = (playlistId) =>
    unwrap(api.delete(`/playlist/${playlistId}`));

export const addVideoToPlaylist = (videoId, playlistId) =>
    unwrap(api.patch(`/playlist/add/${videoId}/${playlistId}`));

export const removeVideoFromPlaylist = (videoId, playlistId) =>
    unwrap(api.patch(`/playlist/remove/${videoId}/${playlistId}`));
