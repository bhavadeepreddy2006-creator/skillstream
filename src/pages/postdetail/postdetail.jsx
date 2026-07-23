import "./postdetail.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPostById, deletePost } from "../../api/postApi";
import { fetchCommentsForPost, addComment, deleteComment } from "../../api/commentApi";
import { toggleLike, toggleSavePost, fetchMyLikedPostIds, fetchMySavedPostIds } from "../../api/engagementApi";
import { followUser, unfollowUser, fetchFollowStatus } from "../../api/followApi";
import { reportPost } from "../../api/reportApi";
import { resolveMediaUrl } from "../../api/mediaUrl";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

function PostDetail({ currentUser }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newComment, setNewComment] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isFollowingAuthor, setIsFollowingAuthor] = useState(false);
    const [showReportForm, setShowReportForm] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportMessage, setReportMessage] = useState("");
    const [submittingReport, setSubmittingReport] = useState(false);

    useEffect(() => {
        Promise.all([fetchPostById(id), fetchCommentsForPost(id), fetchMyLikedPostIds(), fetchMySavedPostIds()])
            .then(([postData, commentData, likedIds, savedIds]) => {
                setPost(postData);
                setComments(commentData);
                setIsLiked(likedIds.includes(postData._id));
                setIsSaved(savedIds.includes(postData._id));

                if (postData.author && currentUser && postData.author._id !== currentUser.id) {
                    fetchFollowStatus(postData.author._id).then((status) => setIsFollowingAuthor(status.isFollowing));
                }
            })
            .catch(() => setError("Could not load this post."))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function handleAddComment(e) {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmittingComment(true);
        try {
            const comment = await addComment(id, newComment);
            setComments((prev) => [comment, ...prev]);
            setNewComment("");
        } catch (err) {
            setError(err.response?.data?.message || "Could not post your comment.");
        } finally {
            setSubmittingComment(false);
        }
    }

    async function handleDeleteComment(commentId) {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((c) => c._id !== commentId));
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete this comment.");
        }
    }

    async function handleDeletePost() {
        try {
            await deletePost(id);
            navigate("/feed");
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete this post.");
        }
    }

    async function handleToggleLike() {
        try {
            const result = await toggleLike(id);
            setIsLiked(result.liked);
            setPost((prev) => ({ ...prev, likesCount: result.likesCount }));
        } catch (err) {
            setError(err.response?.data?.message || "Could not update like.");
        }
    }

    async function handleToggleSave() {
        try {
            const result = await toggleSavePost(id);
            setIsSaved(result.saved);
        } catch (err) {
            setError(err.response?.data?.message || "Could not update saved status.");
        }
    }

    async function handleToggleFollowAuthor() {
        try {
            if (isFollowingAuthor) {
                await unfollowUser(post.author._id);
            } else {
                await followUser(post.author._id);
            }
            setIsFollowingAuthor(!isFollowingAuthor);
        } catch (err) {
            setError(err.response?.data?.message || "Could not update follow status.");
        }
    }

    async function handleSubmitReport(e) {
        e.preventDefault();
        if (!reportReason.trim()) return;

        setSubmittingReport(true);
        try {
            await reportPost(id, reportReason);
            setReportMessage("Report submitted. Thanks for helping keep the community safe.");
            setReportReason("");
            setTimeout(() => setShowReportForm(false), 1500);
        } catch (err) {
            setReportMessage(err.response?.data?.message || "Could not submit your report.");
        } finally {
            setSubmittingReport(false);
        }
    }

    if (loading) return <h2>Loading...</h2>;
    if (error && !post) return <h2>{error}</h2>;
    if (!post) return <h2>Post not found.</h2>;

    const isOwner = currentUser && post.author?._id === currentUser.id;

    return (
        <div className="postdetail-page">

            <div className="postdetail-card">

                {post.thumbnail && (
                    <img className="postdetail-thumbnail" src={resolveMediaUrl(post.thumbnail)} alt={post.title} />
                )}

                <div className="postdetail-meta">
                    {post.category && <span className="post-category">{post.category}</span>}
                    <span className="post-difficulty">{post.difficulty}</span>
                </div>

                <h1>{post.title}</h1>

                <div className="postdetail-byline">
                    <span>By {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()} · {post.views} views</span>
                    {!isOwner && currentUser && (
                        <button className={isFollowingAuthor ? "unfollow-btn" : "follow-btn"} onClick={handleToggleFollowAuthor}>
                            {isFollowingAuthor ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </div>

                {(post.technologies.length > 0 || post.tags.length > 0) && (
                    <div className="tag-list">
                        {post.technologies.map((t) => <span className="tag" key={t}>{t}</span>)}
                        {post.tags.map((t) => <span className="tag tag-muted" key={t}>#{t}</span>)}
                    </div>
                )}

                <div className="postdetail-content">
                    {post.content}
                </div>

                <div className="postdetail-engagement">
                    <button className="engagement-btn-large" onClick={handleToggleLike}>
                        {isLiked ? <FaHeart className="liked-icon" /> : <FaRegHeart />}
                        <span>{post.likesCount} {post.likesCount === 1 ? "Like" : "Likes"}</span>
                    </button>
                    <button className="engagement-btn-large" onClick={handleToggleSave}>
                        {isSaved ? <FaBookmark className="saved-icon" /> : <FaRegBookmark />}
                        <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                    {!isOwner && (
                        <button className="engagement-btn-large report-trigger-btn" onClick={() => setShowReportForm(!showReportForm)}>
                            <span>Report</span>
                        </button>
                    )}
                </div>

                {showReportForm && (
                    <form className="report-form" onSubmit={handleSubmitReport}>
                        <label>Why are you reporting this post?</label>
                        <textarea
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="Describe the issue..."
                            required
                        />
                        <button type="submit" disabled={submittingReport}>
                            {submittingReport ? "Submitting..." : "Submit Report"}
                        </button>
                        {reportMessage && <p className="report-message">{reportMessage}</p>}
                    </form>
                )}

                {isOwner && (
                    <div className="postdetail-owner-actions">
                        <Link className="edit-post-btn" to={`/createpost/edit/${post._id}`}>Edit Post</Link>
                        <button className="delete-post-btn" onClick={handleDeletePost}>Delete Post</button>
                    </div>
                )}

                <hr />

                <div className="comments-section">
                    <h3>Comments ({comments.length})</h3>

                    <form className="comment-form" onSubmit={handleAddComment}>
                        <textarea
                            placeholder="Share your thoughts..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit" disabled={submittingComment}>
                            {submittingComment ? "Posting..." : "Post Comment"}
                        </button>
                    </form>

                    {error && <p className="postdetail-error">{error}</p>}

                    <div className="comment-list">
                        {comments.map((comment) => {
                            const canDelete = currentUser && (comment.author?._id === currentUser.id || isOwner);
                            return (
                                <div className="comment-item" key={comment._id}>
                                    <div className="comment-header">
                                        <strong>{comment.author?.name}</strong>
                                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p>{comment.content}</p>
                                    {canDelete && (
                                        <button className="delete-comment-btn" onClick={() => handleDeleteComment(comment._id)}>
                                            Delete
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default PostDetail;
