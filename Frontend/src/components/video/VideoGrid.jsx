import VideoCard from "./VideoCard.jsx";
import VideoCardSkeleton from "./VideoCardSkeleton.jsx";
import StateBlock from "../common/StateBlock.jsx";

const VideoGrid = ({ videos, loading, emptyTitle = "No videos yet", emptyDescription }) => {
    if (loading) {
        return (
            <div className="video-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                    <VideoCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return <StateBlock title={emptyTitle} description={emptyDescription} />;
    }

    return (
        <div className="video-grid">
            {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
            ))}
        </div>
    );
};

export default VideoGrid;
