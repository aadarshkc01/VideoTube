import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    deletePlaylist,
    getPlaylistById,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../api/playlist.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Loader from "../components/common/Loader.jsx";
import StateBlock from "../components/common/StateBlock.jsx";
import VideoRow from "../components/video/VideoRow.jsx";
import { TrashIcon } from "../components/common/Icons.jsx";

const PlaylistDetail = () => {
    const { playlistId } = useParams();
    const { user } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const load = () => {
        setLoading(true);
        getPlaylistById(playlistId)
            .then((data) => {
                setPlaylist(data);
                setName(data.name);
                setDescription(data.description);
            })
            .catch(() => setPlaylist(null))
            .finally(() => setLoading(false));
    };

    useEffect(load, [playlistId]);

    const isOwner = user?._id === playlist?.owner?._id;

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updated = await updatePlaylist(playlistId, { name: name.trim(), description: description.trim() });
            setPlaylist((prev) => ({ ...prev, ...updated }));
            setEditing(false);
            toast.show("Playlist updated");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't update playlist");
        }
    };

    const handleRemoveVideo = async (videoId) => {
        try {
            await removeVideoFromPlaylist(videoId, playlistId);
            setPlaylist((prev) => ({ ...prev, videos: prev.videos.filter((v) => v._id !== videoId) }));
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't remove video");
        }
    };

    const handleDeletePlaylist = async () => {
        if (!window.confirm("Delete this playlist? This can't be undone.")) return;
        try {
            await deletePlaylist(playlistId);
            toast.show("Playlist deleted");
            navigate("/playlists");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't delete playlist");
        }
    };

    if (loading) return <Loader />;
    if (!playlist) return <StateBlock title="Playlist not found" />;

    return (
        <div>
            {editing ? (
                <form onSubmit={handleSave} className="panel" style={{ marginBottom: 24, maxWidth: 480 }}>
                    <div className="field">
                        <label htmlFor="pname">Name</label>
                        <input id="pname" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="pdesc">Description</label>
                        <textarea id="pdesc" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn--primary btn--sm">Save</button>
                        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="page-head">
                    <div>
                        <h1>{playlist.name}</h1>
                        <p style={{ color: "var(--text-dim)", fontSize: 13.5, marginTop: 6 }}>{playlist.description}</p>
                    </div>
                    {isOwner && (
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn btn--secondary btn--sm" onClick={() => setEditing(true)}>
                                Edit
                            </button>
                            <button className="btn btn--danger btn--sm" onClick={handleDeletePlaylist}>
                                <TrashIcon width={16} height={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {(!playlist.videos || playlist.videos.length === 0) ? (
                <StateBlock title="No videos in this playlist" />
            ) : (
                <div>
                    {playlist.videos.map((v) => (
                        <VideoRow
                            key={v._id}
                            video={v}
                            action={
                                isOwner && (
                                    <button
                                        className="btn btn--ghost btn--icon"
                                        style={{ color: "var(--danger)" }}
                                        onClick={() => handleRemoveVideo(v._id)}
                                        aria-label="Remove from playlist"
                                    >
                                        <TrashIcon width={16} height={16} />
                                    </button>
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaylistDetail;
