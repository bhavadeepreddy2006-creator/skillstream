import "./explore.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../api/userApi";
import { followUser, unfollowUser, fetchMyFollowingIds } from "../../api/followApi";

function Explore({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [followingIds, setFollowingIds] = useState(new Set());
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([fetchUsers(), fetchMyFollowingIds()])
            .then(([usersData, followingData]) => {
                setUsers(usersData);
                setFollowingIds(new Set(followingData));
            })
            .catch(() => setError("Could not load creators."))
            .finally(() => setLoading(false));
    }, []);

    async function handleToggleFollow(userId) {
        const isFollowing = followingIds.has(userId);
        try {
            if (isFollowing) {
                await unfollowUser(userId);
                setFollowingIds((prev) => {
                    const next = new Set(prev);
                    next.delete(userId);
                    return next;
                });
            } else {
                await followUser(userId);
                setFollowingIds((prev) => new Set(prev).add(userId));
            }
        } catch (err) {
            setError(err.response?.data?.message || "Could not update follow status.");
        }
    }

    if (loading) return <h2>Loading creators...</h2>;

    const otherUsers = users.filter((u) => u._id !== currentUser?.id);
    const filteredUsers = otherUsers.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="explore-page">

            <div className="explore-header">
                <h1>Explore Creators</h1>
                <input
                    type="text"
                    placeholder="Search creators..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {error && <p className="explore-error">{error}</p>}

            {filteredUsers.length === 0 ? (
                <p className="explore-empty">No creators found.</p>
            ) : (
                <div className="explore-grid">
                    {filteredUsers.map((user) => {
                        const isFollowing = followingIds.has(user._id);
                        return (
                            <div className="creator-card" key={user._id}>
                                <h3>{user.name}</h3>
                                <p className="creator-role">{user.role}</p>
                                <div className="creator-card-actions">
                                    <Link className="view-profile-btn" to={`/userdata/${user._id}`}>View</Link>
                                    <button
                                        className={isFollowing ? "unfollow-btn" : "follow-btn"}
                                        onClick={() => handleToggleFollow(user._id)}
                                    >
                                        {isFollowing ? "Unfollow" : "Follow"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}

export default Explore;
