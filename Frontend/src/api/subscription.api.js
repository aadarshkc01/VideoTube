import { api, unwrap } from "./axios.js";

export const toggleSubscription = (channelId) =>
    unwrap(api.post(`/subscriptions/c/${channelId}`));

export const getSubscribedChannels = (subscriberId) =>
    unwrap(api.get(`/subscriptions/c/${subscriberId}`));

export const getChannelSubscribers = (channelId) =>
    unwrap(api.get(`/subscriptions/u/${channelId}`));
