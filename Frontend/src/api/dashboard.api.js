import { api, unwrap } from "./axios.js";

export const getChannelStats = () => unwrap(api.get("/dashboard/stats"));

export const getChannelVideos = () => unwrap(api.get("/dashboard/videos"));
