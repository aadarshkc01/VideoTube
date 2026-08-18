import { Link } from "react-router-dom";
import { formatCount, formatDuration, formatRelativeTime } from "../../utils/formatters.js";

const VideoRow = ({ video, action }) => {
    const owner = video.owner || {};

    return (
        <div className="video-row">
            <Link to={`/watch/${video._id}`} className="video-row__thumb">
                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                <span className="duration-badge">{formatDuration(video.duration)}</span>
            </Link>
            <div className="video-card__meta" style={{ flex: 1 }}>
                <Link to={`/watch/${video._id}`}>
                    <p className="video-card__title" style={{ fontSize: 15 }}>
                        {video.title}
                    </p>
                </Link>
                <p className="video-card__channel">{owner.fullName || owner.username}</p>
                <p className="video-card__stats timecode">
                    {formatCount(video.views)} views &middot; {formatRelativeTime(video.createdAt)}
                </p>
            </div>
            {action}
        </div>
    );
};

export default VideoRow;
