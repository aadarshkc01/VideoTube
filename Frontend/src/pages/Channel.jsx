import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannelProfile } from "../api/auth.api.js";
import { getAllVideos } from "../api/video.api.js";
import { getUserPlaylists } from "../api/playlist.api.js";
import { toggleSubscription } from "../api/subscription.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Avatar from "../components/common/Avatar.jsx";
import Loader from "../components/common/Loader.jsx";
import StateBlock from "../components/common/StateBlock.jsx";
import VideoGrid from "../components/video/VideoGrid.jsx";
import { formatCount } from "../utils/formatters.js";

const TABS = ["Videos", "Playlists", "About"];

const Channel = () => {
    const { username } = useParams();
    const { user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("Videos");
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getChannelProfile(username)
            .then((data) => {
                if (cancelled) return;
                setChannel(data);
                setSubscribed(Boolean(data.isSubscribed));
                setSubscriberCount(data.subscribersCount || 0);
            })
            .catch(() => {
                if (!cancelled) setChannel(null);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [username]);

    useEffect(() => {
        if (!channel?._id) return;
        setVideosLoading(true);
        getAllVideos({ userId: channel._id, page: 1, limit: 24 })
            .then((data) => setVideos(data.docs || []))
            .catch(() => setVideos([]))
            .finally(() => setVideosLoading(false));
        getUserPlaylists(channel._id)
            .then(setPlaylists)
            .catch(() => setPlaylists([]));
    }, [channel?._id]);

    const handleSubscribe = async () => {
        if (!user) return navigate("/login");
        const was = subscribed;
        setSubscribed(!was);
        setSubscriberCount((n) => n + (was ? -1 : 1));
        try {
            await toggleSubscription(channel._id);
        } catch {
            setSubscribed(was);
            setSubscriberCount((n) => n + (was ? 1 : -1));
            toast.error("Couldn't update subscription");
        }
    };

    if (loading) return <Loader />;
    if (!channel) return <StateBlock title="Channel not found" />;

    const isOwner = user?.username === channel.username;

    return (
        <div>
            {channel.coverImage && (
                <div className="channel-banner">
                    <img src={channel.coverImage} alt="" />
                </div>
            )}

            <div className="channel-head">
                <Avatar src={channel.avatar} alt={channel.fullName} size={88} />
                <div className="channel-head__meta">
                    <h1 className="channel-head__name">{channel.fullName}</h1>
                    <p className="channel-head__handle">@{channel.username}</p>
                    <p className="channel-head__stats">
                        {formatCount(subscriberCount)} subscribers &middot;{" "}
                        {formatCount(channel.channelsSubscribedToCount)} subscribed to
                    </p>
                </div>
                {!isOwner && (
                    <button
                        className={`btn ${subscribed ? "btn--secondary" : "btn--primary"}`}
                        onClick={handleSubscribe}
                    >
                        {subscribed ? "Subscribed" : "Subscribe"}
                    </button>
                )}
            </div>

            <div className="tabs" style={{ marginTop: 32 }}>
                {TABS.map((t) => (
                    <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
                        {t}
                    </button>
                ))}
            </div>

            {tab === "Videos" && (
                <VideoGrid
                    videos={videos}
                    loading={videosLoading}
                    emptyTitle="No videos published"
                    emptyDescription={isOwner ? "Upload your first video to get started." : "This channel hasn't posted anything yet."}
                />
            )}

            {tab === "Playlists" && (
                <div className="video-grid">
                    {playlists.length === 0 ? (
                        <StateBlock title="No playlists" />
                    ) : (
                        playlists.map((p) => (
                            <div key={p._id} className="panel" style={{ cursor: "pointer" }} onClick={() => navigate(`/playlists/${p._id}`)}>
                                <h3 style={{ fontSize: 15 }}>{p.name}</h3>
                                <p style={{ color: "var(--text-dim)", fontSize: 13, marginTop: 6 }}>
                                    {p.videoCount ?? 0} videos
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {tab === "About" && (
                <div className="panel" style={{ maxWidth: 560 }}>
                    <p style={{ color: "var(--text-dim)", fontSize: 13.5, marginBottom: 8 }}>Joined</p>
                    <p style={{ marginBottom: 16 }}>
                        {channel.createdAt ? new Date(channel.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long" }) : "—"}
                    </p>
                    {isOwner && (
                        <>
                            <p style={{ color: "var(--text-dim)", fontSize: 13.5, marginBottom: 8 }}>Email</p>
                            <p>{channel.email}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Channel;
