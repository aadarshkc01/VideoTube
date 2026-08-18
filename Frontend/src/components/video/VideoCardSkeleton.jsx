const VideoCardSkeleton = () => (
    <div className="video-card">
        <div className="skeleton video-card__thumb" />
        <div className="video-card__body">
            <div className="skeleton" style={{ width: 36, height: 36, borderRadius: "50%" }} />
            <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 12, width: "60%", marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 12, width: "40%" }} />
            </div>
        </div>
    </div>
);

export default VideoCardSkeleton;
