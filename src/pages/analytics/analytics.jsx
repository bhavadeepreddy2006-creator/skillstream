import "./analytics.css";
import { useEffect, useState } from "react";
import { fetchMyAnalytics } from "../../api/analyticsApi";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { FaFileAlt, FaEye, FaHeart, FaComment, FaUsers } from "react-icons/fa";

function formatShortDate(isoDate) {
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function Analytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyAnalytics()
            .then((result) => setData(result))
            .catch(() => setError("Could not load analytics."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h2>Loading analytics...</h2>;
    if (error) return <h2>{error}</h2>;
    if (!data) return null;

    const { totals, postsBreakdown, growth } = data;

    // Merge the three independent 30-day series into one array for a
    // single combined chart — all three cover the same date range.
    const chartData = growth.likes.map((point, index) => ({
        date: formatShortDate(point.date),
        Likes: point.count,
        Comments: growth.comments[index].count,
        Followers: growth.followers[index].count,
    }));

    return (
        <div className="analytics-page">

            <h1>Analytics</h1>
            <p className="analytics-subtitle">A snapshot of how your content and profile are performing.</p>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaFileAlt className="stat-icon" />
                    <div>
                        <span className="stat-value">{totals.totalPosts}</span>
                        <span className="stat-label">Posts ({totals.publishedPosts} published, {totals.draftPosts} draft)</span>
                    </div>
                </div>
                <div className="stat-card">
                    <FaEye className="stat-icon" />
                    <div>
                        <span className="stat-value">{totals.totalViews}</span>
                        <span className="stat-label">Total Views</span>
                    </div>
                </div>
                <div className="stat-card">
                    <FaHeart className="stat-icon" />
                    <div>
                        <span className="stat-value">{totals.totalLikes}</span>
                        <span className="stat-label">Total Likes</span>
                    </div>
                </div>
                <div className="stat-card">
                    <FaComment className="stat-icon" />
                    <div>
                        <span className="stat-value">{totals.totalComments}</span>
                        <span className="stat-label">Total Comments</span>
                    </div>
                </div>
                <div className="stat-card">
                    <FaUsers className="stat-icon" />
                    <div>
                        <span className="stat-value">{totals.followersCount}</span>
                        <span className="stat-label">Followers ({totals.followingCount} following)</span>
                    </div>
                </div>
            </div>

            <div className="analytics-chart-card">
                <h3>Growth — Last 30 Days</h3>
                <p className="chart-note">
                    Views aren't shown here — they're tracked as a running total, not individual events, so there's no per-day history to chart yet.
                </p>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis allowDecimals={false} fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Likes" stroke="#dc2626" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Comments" stroke="#16a34a" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Followers" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="analytics-table-card">
                <h3>Post Performance</h3>
                {postsBreakdown.length === 0 ? (
                    <p className="analytics-empty">You haven't written any posts yet.</p>
                ) : (
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsBreakdown.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                    <td>
                                        <span className={`status-badge status-${post.status}`}>{post.status}</span>
                                    </td>
                                    <td>{post.views}</td>
                                    <td>{post.likesCount}</td>
                                    <td>{post.commentsCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}

export default Analytics;
