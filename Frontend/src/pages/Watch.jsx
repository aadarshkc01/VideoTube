import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteVideo, getAllVideos, getVideoById } from "../api/video.api.js";
import { toggleVideoLike } from "../api/like.api.js";
import { toggleSubscription } from "../api/subscription.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Avatar from "../components/common/Avatar.jsx";
import Loader from "../components/common/Loader.jsx";
import StateBlock from "../components/common/StateBlock.jsx";
import VideoRow from "../components/video/VideoRow.jsx";
import CommentSection from "../components/comments/CommentSection.jsx";
import { ThumbUpIcon, TrashIcon } from "../components/common/Icons.jsx";
import { formatCount, formatRelativeTime } from "../utils/formatters.js";

const Watch = () => {
    const { videoId } = useParams();
    const { user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [subscribed, setSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [upNext, setUpNext] = useState([]);
    const [descOpen, setDescOpen] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setNotFound(false);

        getVideoById(videoId)
            .then((data) => {
                if (cancelled) return;
                setVideo(data);
                setLikeCount(data.likesCount || 0);
                setLiked(Boolean(data.isLiked));
                setSubscribed(Boolean(data.isSubscribed));
                setSubscriberCount(data.subscribersCount || 0);
            })
            .catch(() => {
                if (!cancelled) setNotFound(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        getAllVideos({ page: 1, limit: 10 })
            .then((data) => {
                if (!cancelled) setUpNext((data.docs || []).filter((v) => v._id !== videoId));
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [videoId]);

    const handleLike = async () => {
        if (!user) return navigate("/login");
        const wasLiked = liked;
        setLiked(!wasLiked);
        setLikeCount((n) => n + (wasLiked ? -1 : 1));
        try {
            await toggleVideoLike(videoId);
        } catch {
            setLiked(wasLiked);
            setLikeCount((n) => n + (wasLiked ? 1 : -1));
            toast.error("Couldn't update like");
        }
    };

    const handleSubscribe = async () => {
        if (!user) return navigate("/login");
        const wasSubscribed = subscribed;
        setSubscribed(!wasSubscribed);
        setSubscriberCount((n) => n + (wasSubscribed ? -1 : 1));
        try {
            await toggleSubscription(video.owner._id);
        } catch {
            setSubscribed(wasSubscribed);
            setSubscriberCount((n) => n + (wasSubscribed ? 1 : -1));
            toast.error("Couldn't update subscription");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this video? This can't be undone.")) return;
        try {
            await deleteVideo(videoId);
            toast.show("Video deleted");
            navigate(`/channel/${video.owner.username}`);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't delete video");
        }
    };

    if (loading) return <Loader />;
    if (notFound || !video) {
        return <StateBlock title="Video unavailable" description="It may have been removed or made private." />;
    }

    const isOwner = user?._id === video.owner?._id;

    return (
        <div className="watch-layout">
            <div>
                <div className="player">
                    <video src={video.videoFile} poster={video.thumbnail} controls autoPlay />
                </div>

                <h1 className="watch-title">{video.title}</h1>

                <div className="watch-meta-row">
                    <Link to={`/channel/${video.owner?.username}`} className="channel-line">
                        <Avatar src={video.owner?.avatar} alt={video.owner?.fullName} size={44} />
                        <div>
                            <p className="channel-line__name">{video.owner?.fullName}</p>
                            <p className="channel-line__subs">{formatCount(subscriberCount)} subscribers</p>
                        </div>
                    </Link>

                    <div className="action-cluster">
                        {!isOwner && (
                            <button
                                className={`btn ${subscribed ? "btn--secondary" : "btn--primary"} btn--sm`}
                                onClick={handleSubscribe}
                            >
                                {subscribed ? "Subscribed" : "Subscribe"}
                            </button>
                        )}

                        <button className="pill-group" style={{ display: "flex" }} onClick={handleLike}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px" }}>
                                <ThumbUpIcon filled={liked} width={16} height={16} />
                                {formatCount(likeCount)}
                            </span>
                        </button>

                        {isOwner && (
                            <>
                                <Link to={`/edit-video/${video._id}`} className="btn btn--secondary btn--sm">
                                    Edit
                                </Link>
                                <button className="btn btn--danger btn--sm" onClick={handleDelete}>
                                    <TrashIcon width={16} height={16} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div
                    className="description-panel"
                    onClick={() => setDescOpen((v) => !v)}
                    style={{ cursor: "pointer" }}
                >
                    <p className="description-panel__stats timecode">
                        {formatCount(video.views)} views &middot; {formatRelativeTime(video.createdAt)}
                    </p>
                    <p style={{ WebkitLineClamp: descOpen ? "unset" : 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {video.description}
                    </p>
                </div>

                <div className="filmstrip-divider">
                    <span className="filmstrip-divider__label">Discussion</span>
                </div>

                <CommentSection videoId={videoId} />
            </div>

            <aside className="up-next">
                {upNext.map((v) => (
                    <VideoRow key={v._id} video={v} />
                ))}
            </aside>
        </div>
    );
};

export default Watch;
