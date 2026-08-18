import { useEffect, useState } from "react";
import { getLikedVideos } from "../api/like.api.js";
import VideoGrid from "../components/video/VideoGrid.jsx";

const LikedVideos = () => {
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        getLikedVideos()
            .then(setVideos)
            .catch(() => setVideos([]));
    }, []);

    return (
        <div>
            <div className="page-head">
                <h1>Liked videos</h1>
            </div>
            <VideoGrid
                videos={videos}
                loading={videos === null}
                emptyTitle="No liked videos"
                emptyDescription="Videos you like will show up here."
            />
        </div>
    );
};

export default LikedVideos;
