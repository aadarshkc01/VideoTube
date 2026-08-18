import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publishVideo } from "../api/video.api.js";
import { useToast } from "../context/ToastContext.jsx";

const Upload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const videoInputRef = useRef(null);
    const thumbInputRef = useRef(null);
    const navigate = useNavigate();
    const toast = useToast();

    const handleThumbnail = (file) => {
        setThumbnailFile(file);
        setThumbnailPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !description.trim() || !videoFile || !thumbnailFile) {
            setError("Fill in a title, description, video file and thumbnail.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("videoFile", videoFile);
        formData.append("thumbnail", thumbnailFile);

        setSubmitting(true);
        try {
            const video = await publishVideo(formData, (evt) => {
                if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
            });
            toast.show("Video published");
            navigate(`/watch/${video._id}`);
        } catch (err) {
            setError(err?.response?.data?.message || "Couldn't publish this video.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="main--narrow">
            <div className="page-head">
                <h1>Upload a video</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="upload-grid">
                    <div>
                        <div className="field">
                            <label>Video file</label>
                            <div className="file-drop" onClick={() => videoInputRef.current?.click()}>
                                {videoFile ? videoFile.name : "MP4, WebM or MOV"}
                                <input
                                    ref={videoInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </div>

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
                                {thumbnailFile ? thumbnailFile.name : "JPG or PNG, 16:9 works best"}
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

                {submitting && (
                    <p className="timecode" style={{ color: "var(--text-dim)", marginBottom: 16 }}>
                        Uploading… {progress}%
                    </p>
                )}

                <button className="btn btn--primary" disabled={submitting}>
                    {submitting ? "Publishing…" : "Publish"}
                </button>
            </form>
        </div>
    );
};

export default Upload;
