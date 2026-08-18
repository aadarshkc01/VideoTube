import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVideoById, updateVideo } from "../api/video.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Loader from "../components/common/Loader.jsx";
import StateBlock from "../components/common/StateBlock.jsx";

const EditVideo = () => {
    const { videoId } = useParams();
    const { user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const thumbInputRef = useRef(null);

    useEffect(() => {
        getVideoById(videoId)
            .then((data) => {
                setVideo(data);
                setTitle(data.title);
                setDescription(data.description);
                setThumbnailPreview(data.thumbnail);
            })
            .catch(() => setVideo(null))
            .finally(() => setLoading(false));
    }, [videoId]);

    const handleThumbnail = (file) => {
        if (!file) return;
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!title.trim() || !description.trim()) {
            setError("Title and description can't be empty.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

        setSubmitting(true);
        try {
            await updateVideo(videoId, formData);
            toast.show("Video updated");
            navigate(`/watch/${videoId}`);
        } catch (err) {
            setError(err?.response?.data?.message || "Couldn't update this video.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loader />;
    if (!video) return <StateBlock title="Video not found" />;
    if (user?._id !== video.owner?._id) {
        return <StateBlock title="Not your video" description="You can only edit videos you own." />;
    }

    return (
        <div className="main--narrow">
            <div className="page-head">
                <h1>Edit video</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="upload-grid">
                    <div>
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="field">
                            <label>Thumbnail</label>
                            {thumbnailPreview && (
                                <div className="thumb-preview">
                                    <img src={thumbnailPreview} alt="Thumbnail preview" />
                                </div>
                            )}
                            <div className="file-drop" onClick={() => thumbInputRef.current?.click()}>
                                Replace thumbnail
                                <input
                                    ref={thumbInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleThumbnail(e.target.files?.[0] || null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {error && <p className="field-error" style={{ marginBottom: 16 }}>{error}</p>}

                <button className="btn btn--primary" disabled={submitting}>
                    {submitting ? "Saving…" : "Save changes"}
                </button>
            </form>
        </div>
    );
};

export default EditVideo;
