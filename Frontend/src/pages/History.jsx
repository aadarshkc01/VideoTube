import { useEffect, useState } from "react";
import { getWatchHistory } from "../api/auth.api.js";
import VideoGrid from "../components/video/VideoGrid.jsx";

const History = () => {
    const [videos, setVideos] = useState(null);

    useEffect(() => {
        getWatchHistory()
            .then(setVideos)
            .catch(() => setVideos([]));
    }, []);

    return (
        <div>
            <div className="page-head">
                <h1>Watch history</h1>
            </div>
            <VideoGrid
                videos={videos}
                loading={videos === null}
                emptyTitle="No watch history"
                emptyDescription="Videos you watch will show up here."
            />
        </div>
    );
};

export default History;
