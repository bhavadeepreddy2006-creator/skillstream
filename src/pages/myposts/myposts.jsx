import "./myposts.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyPosts, deletePost, updatePost } from "../../api/postApi";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyPosts()
            .then((data) => setPosts(data))
            .catch(() => setError("Could not load your posts."))
            .finally(() => setLoading(false));
    }, []);

    async function handleDelete(id) {
        try {
            await deletePost(id);
            setPosts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete this post.");
        }
    }

    async function handleToggleStatus(post) {
        const newStatus = post.status === "published" ? "draft" : "published";
        try {
            const updated = await updatePost(post._id, { status: newStatus });
            setPosts((prev) => prev.map((p) => (p._id === post._id ? updated : p)));
        } catch (err) {
            setError(err.response?.data?.message || "Could not update this post.");
        }
    }

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="myposts-page">

            <h1>My Posts</h1>

            {error && <p className="myposts-error">{error}</p>}

            {posts.length === 0 ? (
                <p className="myposts-empty">
                    You haven't written anything yet. <Link to="/createpost">Create your first post</Link>.
                </p>
            ) : (
                <table className="myposts-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Views</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id}>
                                <td>
                                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                                </td>
                                <td>
                                    <span className={`status-badge status-${post.status}`}>{post.status}</span>
                                </td>
                                <td>{post.views}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className="myposts-actions">
                                    <Link className="myposts-edit-btn" to={`/createpost/edit/${post._id}`}>Edit</Link>
                                    <button className="myposts-toggle-btn" onClick={() => handleToggleStatus(post)}>
                                        {post.status === "published" ? "Unpublish" : "Publish"}
                                    </button>
                                    <button className="myposts-delete-btn" onClick={() => handleDelete(post._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}

export default MyPosts;
