import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../api/video.api.js";
import VideoGrid from "../components/video/VideoGrid.jsx";

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) {
            setVideos([]);
            setLoading(false);
            return;
        }
        let cancelled = false;
        setLoading(true);
        getAllVideos({ query, page: 1, limit: 24 })
            .then((data) => {
                if (!cancelled) setVideos(data.docs || []);
            })
            .catch(() => {
                if (!cancelled) setVideos([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [query]);

    return (
        <div>
            <p className="results-head">Results for &ldquo;{query}&rdquo;</p>
            <VideoGrid
                videos={videos}
                loading={loading}
                emptyTitle="No matches"
                emptyDescription="Try a different search term."
            />
        </div>
    );
};

export default Search;
