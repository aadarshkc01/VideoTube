import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPlaylist, getUserPlaylists } from "../api/playlist.api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Loader from "../components/common/Loader.jsx";
import StateBlock from "../components/common/StateBlock.jsx";
import { PlusIcon } from "../components/common/Icons.jsx";

const Playlists = () => {
    const { user } = useAuth();
    const toast = useToast();
    const [playlists, setPlaylists] = useState(null);
    const [creating, setCreating] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const load = () => {
        if (!user) return;
        getUserPlaylists(user._id)
            .then(setPlaylists)
            .catch(() => setPlaylists([]));
    };

    useEffect(load, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return;
        setSubmitting(true);
        try {
            const playlist = await createPlaylist({ name: name.trim(), description: description.trim() });
            setPlaylists((prev) => [playlist, ...(prev || [])]);
            setName("");
            setDescription("");
            setCreating(false);
            toast.show("Playlist created");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't create playlist");
        } finally {
            setSubmitting(false);
        }
    };

    if (playlists === null) return <Loader />;

    return (
        <div>
            <div className="page-head">
                <h1>Your playlists</h1>
                <button className="btn btn--primary btn--sm" onClick={() => setCreating((v) => !v)}>
                    <PlusIcon width={16} height={16} />
                    New playlist
                </button>
            </div>

            {creating && (
                <form onSubmit={handleCreate} className="panel" style={{ marginBottom: 24, maxWidth: 480 }}>
                    <div className="field">
                        <label htmlFor="pname">Name</label>
                        <input id="pname" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="pdesc">Description</label>
                        <textarea id="pdesc" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button className="btn btn--primary btn--sm" disabled={submitting}>
                        {submitting ? "Creating…" : "Create"}
                    </button>
                </form>
            )}

            {playlists.length === 0 ? (
                <StateBlock title="No playlists yet" description="Group videos together to watch or share later." />
            ) : (
                <div className="video-grid">
                    {playlists.map((p) => (
                        <Link key={p._id} to={`/playlists/${p._id}`} className="panel" style={{ display: "block" }}>
                            <h3 style={{ fontSize: 15 }}>{p.name}</h3>
                            <p style={{ color: "var(--text-dim)", fontSize: 13, marginTop: 6 }}>
                                {p.videoCount ?? 0} videos
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Playlists;
