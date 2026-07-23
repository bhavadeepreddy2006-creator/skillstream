import "./admin.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUserApi } from "../../api/userApi";
import { fetchAdminOverview, updateUserRoleApi, fetchAllPostsAdmin } from "../../api/adminApi";
import { fetchReports, resolveReportApi } from "../../api/reportApi";
import { deletePost } from "../../api/postApi";
import { FaUsers, FaFileAlt, FaComment, FaHeart, FaUserFriends, FaFlag } from "react-icons/fa";

function Admin({ currentUser }) {
    const [tab, setTab] = useState("overview");

    if (currentUser && currentUser.role !== "admin") {
        return (
            <div className="admin-page">
                <h2>You don't have access to this page.</h2>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>

            <div className="admin-tabs">
                <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button>
                <button className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}>Users</button>
                <button className={tab === "posts" ? "active" : ""} onClick={() => setTab("posts")}>Posts</button>
                <button className={tab === "reports" ? "active" : ""} onClick={() => setTab("reports")}>Reports</button>
            </div>

            {tab === "overview" && <OverviewTab />}
            {tab === "users" && <UsersTab currentUser={currentUser} />}
            {tab === "posts" && <PostsTab />}
            {tab === "reports" && <ReportsTab />}
        </div>
    );
}

function OverviewTab() {
    const [overview, setOverview] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAdminOverview()
            .then((data) => setOverview(data))
            .catch(() => setError("Could not load platform overview."));
    }, []);

    if (error) return <p className="admin-error">{error}</p>;
    if (!overview) return <p>Loading...</p>;

    const cards = [
        { icon: <FaUsers />, label: "Total Users", value: overview.totalUsers },
        { icon: <FaFileAlt />, label: "Published Posts", value: overview.totalPublishedPosts },
        { icon: <FaFileAlt />, label: "Draft Posts", value: overview.totalDraftPosts },
        { icon: <FaComment />, label: "Total Comments", value: overview.totalComments },
        { icon: <FaHeart />, label: "Total Likes", value: overview.totalLikes },
        { icon: <FaUserFriends />, label: "Total Follows", value: overview.totalFollows },
        { icon: <FaFlag />, label: "Pending Reports", value: overview.pendingReports },
    ];

    return (
        <div className="admin-stats-grid">
            {cards.map((card) => (
                <div className="admin-stat-card" key={card.label}>
                    <span className="admin-stat-icon">{card.icon}</span>
                    <div>
                        <span className="admin-stat-value">{card.value}</span>
                        <span className="admin-stat-label">{card.label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function UsersTab({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers()
            .then((data) => setUsers(data))
            .catch(() => setError("Could not load users."))
            .finally(() => setLoading(false));
    }, []);

    async function handleRoleChange(userId, newRole) {
        try {
            const updated = await updateUserRoleApi(userId, newRole);
            setUsers((prev) => prev.map((u) => (u._id === userId ? updated : u)));
        } catch (err) {
            setError(err.response?.data?.message || "Could not update role.");
        }
    }

    async function handleDelete(userId) {
        try {
            await deleteUserApi(userId);
            setUsers((prev) => prev.filter((u) => u._id !== userId));
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete this user.");
        }
    }

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="admin-table-card">
            {error && <p className="admin-error">{error}</p>}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                                    <option value="learner">learner</option>
                                    <option value="creator">creator</option>
                                    <option value="admin">admin</option>
                                </select>
                            </td>
                            <td>
                                {user._id !== currentUser?.id && (
                                    <button className="admin-delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PostsTab() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAllPostsAdmin()
            .then((data) => setPosts(data.posts))
            .catch(() => setError("Could not load posts."))
            .finally(() => setLoading(false));
    }, []);

    async function handleDelete(postId) {
        try {
            await deletePost(postId);
            setPosts((prev) => prev.filter((p) => p._id !== postId));
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete this post.");
        }
    }

    if (loading) return <p>Loading posts...</p>;

    return (
        <div className="admin-table-card">
            {error && <p className="admin-error">{error}</p>}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post._id}>
                            <td><Link to={`/post/${post._id}`}>{post.title}</Link></td>
                            <td>{post.author?.name}</td>
                            <td><span className={`status-badge status-${post.status}`}>{post.status}</span></td>
                            <td>{post.views}</td>
                            <td>
                                <button className="admin-delete-btn" onClick={() => handleDelete(post._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ReportsTab() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchReports("pending")
            .then((data) => setReports(data))
            .catch(() => setError("Could not load reports."))
            .finally(() => setLoading(false));
    }, []);

    async function handleResolve(reportId) {
        try {
            await resolveReportApi(reportId);
            setReports((prev) => prev.filter((r) => r._id !== reportId));
        } catch (err) {
            setError(err.response?.data?.message || "Could not resolve this report.");
        }
    }

    if (loading) return <p>Loading reports...</p>;

    return (
        <div className="admin-table-card">
            {error && <p className="admin-error">{error}</p>}
            {reports.length === 0 ? (
                <p className="admin-empty">No pending reports.</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Post</th>
                            <th>Reported By</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report._id}>
                                <td>
                                    {report.post ? (
                                        <Link to={`/post/${report.post._id}`}>{report.post.title}</Link>
                                    ) : (
                                        <em>Post deleted</em>
                                    )}
                                </td>
                                <td>{report.reporter?.name}</td>
                                <td>{report.reason}</td>
                                <td>
                                    <button className="admin-resolve-btn" onClick={() => handleResolve(report._id)}>
                                        Mark Resolved
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Admin;
