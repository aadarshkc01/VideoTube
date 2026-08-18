import { useEffect, useState } from "react";
import { addComment, deleteComment, getVideoComments, updateComment } from "../../api/comment.api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import Avatar from "../common/Avatar.jsx";
import CommentItem from "./CommentItem.jsx";

const CommentSection = ({ videoId }) => {
    const { user } = useAuth();
    const toast = useToast();
    const [comments, setComments] = useState(null);
    const [totalComments, setTotalComments] = useState(0);
    const [draft, setDraft] = useState("");
    const [posting, setPosting] = useState(false);

    const load = async () => {
        try {
            const data = await getVideoComments(videoId, { page: 1, limit: 50 });
            setComments(data.docs || []);
            setTotalComments(data.totalDocs ?? (data.docs || []).length);
        } catch {
            setComments([]);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    const handlePost = async (e) => {
        e.preventDefault();
        if (!draft.trim() || posting) return;
        setPosting(true);
        try {
            const created = await addComment(videoId, draft.trim());
            setComments((prev) => [{ ...created, owner: user }, ...(prev || [])]);
            setTotalComments((n) => n + 1);
            setDraft("");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't post your comment");
        } finally {
            setPosting(false);
        }
    };

    const handleUpdate = async (commentId, content) => {
        try {
            await updateComment(commentId, content);
            setComments((prev) => prev.map((c) => (c._id === commentId ? { ...c, content } : c)));
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't update comment");
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((c) => c._id !== commentId));
            setTotalComments((n) => Math.max(0, n - 1));
        } catch (err) {
            toast.error(err?.response?.data?.message || "Couldn't delete comment");
        }
    };

    return (
        <section>
            <div className="comments-head">{totalComments} comments</div>

            {user && (
                <form className="comment-form" onSubmit={handlePost}>
                    <Avatar src={user.avatar} alt={user.fullName} size={34} />
                    <textarea
                        placeholder="Add a comment"
                        rows={1}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                    />
                    {draft.trim() && (
                        <button className="btn btn--primary btn--sm" disabled={posting}>
                            Comment
                        </button>
                    )}
                </form>
            )}

            {comments === null ? (
                <p className="timecode" style={{ color: "var(--text-dim)" }}>
                    Loading comments…
                </p>
            ) : comments.length === 0 ? (
                <p style={{ color: "var(--text-dim)", fontSize: 14 }}>Be the first to comment.</p>
            ) : (
                comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </section>
    );
};

export default CommentSection;
