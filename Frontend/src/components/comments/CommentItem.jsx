import { useState } from "react";
import Avatar from "../common/Avatar.jsx";
import { formatRelativeTime } from "../../utils/formatters.js";
import { useAuth } from "../../context/AuthContext.jsx";

const CommentItem = ({ comment, onUpdate, onDelete }) => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(comment.content);
    const isOwner = user?._id === comment.owner?._id;

    const saveEdit = async () => {
        if (!draft.trim() || draft === comment.content) {
            setEditing(false);
            return;
        }
        await onUpdate(comment._id, draft.trim());
        setEditing(false);
    };

    return (
        <div className="comment">
            <Avatar src={comment.owner?.avatar} alt={comment.owner?.username} size={34} />
            <div className="comment__body">
                <div className="comment__head">
                    <span className="comment__author">{comment.owner?.fullName || comment.owner?.username}</span>
                    <span className="comment__time timecode">{formatRelativeTime(comment.createdAt)}</span>
                </div>

                {editing ? (
                    <div style={{ marginTop: 6 }}>
                        <textarea
                            className="field"
                            style={{
                                width: "100%",
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-md)",
                                padding: "8px 10px",
                                color: "var(--text)",
                            }}
                            rows={2}
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            autoFocus
                        />
                        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                            <button className="btn btn--primary btn--sm" onClick={saveEdit}>
                                Save
                            </button>
                            <button className="btn btn--ghost btn--sm" onClick={() => setEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="comment__text">{comment.content}</p>
                        {isOwner && (
                            <div className="comment__actions">
                                <button className="btn btn--ghost btn--sm" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <button
                                    className="btn btn--ghost btn--sm"
                                    onClick={() => onDelete(comment._id)}
                                    style={{ color: "var(--danger)" }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
