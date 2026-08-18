import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChannelStats, getChannelVideos } from "../api/dashboard.api.js";
import { deleteVideo, toggleVideoPublish } from "../api/video.api.js";
import { useToast } from "../context/ToastContext.jsx";
import Loader from "../components/common/Loader.jsx";
import StateBlock from "../components/common/StateBlock.jsx";
import { EditIcon, GlobeIcon, LockIcon, TrashIcon } from "../components/common/Icons.jsx";
import { formatCount, formatDuration, formatRelativeTime } from "../utils/formatters.js";

const Dashboard = () => {
    const toast = useToast();
    const [stats, setStats] = useState(null);
    const [videos, setVideos] = useState(null);
    const [busyId, setBusyId] = useState(null);

    const load = () => {
        getChannelStats().then(setStats).catch(() => setStats(null));
        getChannelVideos()
            .then((data) => setVideos(data || []))
            .catch(() => setVideos([]));
    };

    useEffect(load, []);

    const handleToggle = async (videoId) => {
        setBusyId(videoId);
        try {
            const { isPublished } = await toggleVideoPublish(videoId);
            setVideos((prev) => prev.map((v) => (v._id === videoId ? { ...v, isPublished } : v)));
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't update video");
        } finally {
            setBusyId(null);
        }
    };

    const handleDelete = async (videoId) => {
        if (!window.confirm("Delete this video? This can't be undone.")) return;
        setBusyId(videoId);
        try {
            await deleteVideo(videoId);
            setVideos((prev) => prev.filter((v) => v._id !== videoId));
            toast.show("Video deleted");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't delete video");
        } finally {
            setBusyId(null);
        }
    };

    if (videos === null) return <Loader />;

    return (
        <div>
            <div className="page-head">
                <h1>Dashboard</h1>
                <Link to="/upload" className="btn btn--primary btn--sm">
                    Upload
                </Link>
            </div>

            <div className="stat-grid">
                <div className="stat-card">
                    <p className="stat-card__value">{stats ? formatCount(stats.totalVideos) : "—"}</p>
                    <p className="stat-card__label">Videos</p>
                </div>
                <div className="stat-card">
                    <p className="stat-card__value">{stats ? formatCount(stats.totalViews) : "—"}</p>
                    <p className="stat-card__label">Views</p>
                </div>
                <div className="stat-card">
                    <p className="stat-card__value">{stats ? formatCount(stats.totalSubscribers) : "—"}</p>
                    <p className="stat-card__label">Subscribers</p>
                </div>
                <div className="stat-card">
                    <p className="stat-card__value">{stats ? formatCount(stats.totalLikes) : "—"}</p>
                    <p className="stat-card__label">Likes</p>
                </div>
            </div>

            <div className="filmstrip-divider">
                <span className="filmstrip-divider__label">Your videos</span>
            </div>

            {videos.length === 0 ? (
                <StateBlock
                    title="Nothing published yet"
                    description="Upload a video to see it and its stats here."
                    action={
                        <Link to="/upload" className="btn btn--primary btn--sm">
                            Upload a video
                        </Link>
                    }
                />
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {videos.map((v) => (
                        <div key={v._id} className="video-row" style={{ alignItems: "center" }}>
                            <Link to={`/watch/${v._id}`} className="video-row__thumb">
                                <img src={v.thumbnail} alt={v.title} loading="lazy" />
                                <span className="duration-badge">{formatDuration(v.duration)}</span>
                            </Link>
                            <div className="video-card__meta" style={{ flex: 1 }}>
                                <p className="video-card__title" style={{ fontSize: 15 }}>
                                    {v.title}
                                </p>
                                <p className="video-card__stats timecode">
                                    {formatCount(v.views)} views &middot; {formatCount(v.likesCount)} likes &middot;{" "}
                                    {formatRelativeTime(v.createdAt)}
                                </p>
                            </div>
                            <button
                                className="btn btn--secondary btn--sm"
                                disabled={busyId === v._id}
                                onClick={() => handleToggle(v._id)}
                                title={v.isPublished ? "Unpublish" : "Publish"}
                            >
                                {v.isPublished ? <GlobeIcon width={15} height={15} /> : <LockIcon width={15} height={15} />}
                                {v.isPublished ? "Public" : "Private"}
                            </button>
                            <Link to={`/edit-video/${v._id}`} className="btn btn--ghost btn--icon" aria-label="Edit">
                                <EditIcon width={17} height={17} />
                            </Link>
                            <button
                                className="btn btn--ghost btn--icon"
                                style={{ color: "var(--danger)" }}
                                disabled={busyId === v._id}
                                onClick={() => handleDelete(v._id)}
                                aria-label="Delete"
                            >
                                <TrashIcon width={17} height={17} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
