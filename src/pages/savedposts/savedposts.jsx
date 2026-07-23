import "../feed/feed.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMySavedPosts } from "../../api/engagementApi";
import { resolveMediaUrl } from "../../api/mediaUrl";
import { FaEye, FaRegClock } from "react-icons/fa";

function SavedPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMySavedPosts()
            .then((data) => setPosts(data))
            .catch(() => setError("Could not load your saved posts."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="feed-page">

            <div className="feed-header">
                <h1>Saved Posts</h1>
            </div>

            {loading ? (
                <p className="feed-status">Loading...</p>
            ) : error ? (
                <p className="feed-status">{error}</p>
            ) : posts.length === 0 ? (
                <p className="feed-status">
                    You haven't saved anything yet. Bookmark a post from the <Link to="/feed">Feed</Link> to see it here.
                </p>
            ) : (
                <div className="feed-grid">
                    {posts.map((post) => (
                        <Link className="post-card" to={`/post/${post._id}`} key={post._id}>
                            <div
                                className="post-thumbnail"
                                style={post.thumbnail ? { backgroundImage: `url(${resolveMediaUrl(post.thumbnail)})` } : undefined}
                            />
                            <div className="post-card-body">
                                {post.category && <span className="post-category">{post.category}</span>}
                                <h3>{post.title}</h3>
                                {post.description && <p>{post.description}</p>}
                                <div className="post-card-meta">
                                    <span>{post.author?.name}</span>
                                    <span><FaEye /> {post.views}</span>
                                    <span><FaRegClock /> {new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

        </div>
    );
}

export default SavedPosts;
