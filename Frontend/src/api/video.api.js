import { api, unwrap } from "./axios.js";

export const getAllVideos = (params) => unwrap(api.get("/videos", { params }));

export const getVideoById = (videoId) => unwrap(api.get(`/videos/${videoId}`));

export const publishVideo = (formData, onUploadProgress) =>
    unwrap(
        api.post("/videos", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress,
        })
    );

export const updateVideo = (videoId, formData) =>
    unwrap(
        api.patch(`/videos/${videoId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
    );

export const deleteVideo = (videoId) => unwrap(api.delete(`/videos/${videoId}`));

export const toggleVideoPublish = (videoId) =>
    unwrap(api.patch(`/videos/toggle/publish/${videoId}`));
