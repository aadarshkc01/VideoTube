import { Link } from "react-router-dom";
import Avatar from "../common/Avatar.jsx";
import { formatCount, formatDuration, formatRelativeTime } from "../../utils/formatters.js";

const VideoCard = ({ video }) => {
    const owner = video.owner || {};

    return (
        <Link to={`/watch/${video._id}`} className="video-card">
            <div className="video-card__thumb">
                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                <span className="duration-badge">{formatDuration(video.duration)}</span>
            </div>
            <div className="video-card__body">
                <Link to={`/channel/${owner.username}`} onClick={(e) => e.stopPropagation()}>
                    <Avatar src={owner.avatar} alt={owner.fullName || owner.username} size={36} />
                </Link>
                <div className="video-card__meta">
                    <p className="video-card__title">{video.title}</p>
                    <p className="video-card__channel">{owner.fullName || owner.username}</p>
                    <p className="video-card__stats timecode">
                        {formatCount(video.views)} views &middot; {formatRelativeTime(video.createdAt)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
