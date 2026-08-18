import { api, unwrap } from "./axios.js";

export const getVideoComments = (videoId, params) =>
    unwrap(api.get(`/comments/${videoId}`, { params }));

export const addComment = (videoId, content) =>
    unwrap(api.post(`/comments/${videoId}`, { content }));

export const updateComment = (commentId, content) =>
    unwrap(api.patch(`/comments/c/${commentId}`, { content }));

export const deleteComment = (commentId) =>
    unwrap(api.delete(`/comments/c/${commentId}`));
