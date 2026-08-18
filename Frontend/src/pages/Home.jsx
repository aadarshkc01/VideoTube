import { useEffect, useState } from "react";
import { getAllVideos } from "../api/video.api.js";
import VideoGrid from "../components/video/VideoGrid.jsx";

const SORTS = [
    { value: "createdAt:desc", label: "Newest" },
    { value: "views:desc", label: "Most viewed" },
    { value: "createdAt:asc", label: "Oldest" },
];

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState(SORTS[0].value);

    useEffect(() => {
        let cancelled = false;
        const [sortBy, sortType] = sort.split(":");

        setLoading(true);
        getAllVideos({ page: 1, limit: 24, sortBy, sortType })
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
    }, [sort]);

    return (
        <div>
            <div className="filter-bar">
                {SORTS.map((s) => (
                    <button
                        key={s.value}
                        className={`chip ${sort === s.value ? "active" : ""}`}
                        onClick={() => setSort(s.value)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            <VideoGrid
                videos={videos}
                loading={loading}
                emptyTitle="No videos yet"
                emptyDescription="Be the first to publish something worth watching."
            />
        </div>
    );
};

export default Home;
