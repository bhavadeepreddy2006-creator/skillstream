import "./community.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopContributors } from "../../api/followApi";
import { FaTrophy } from "react-icons/fa";

function Community() {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTopContributors(20)
            .then((data) => setContributors(data))
            .catch(() => setError("Could not load the community leaderboard."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <h2>Loading community...</h2>;

    return (
        <div className="community-page">

            <h1>Top Contributors</h1>
            <p className="community-subtitle">Ranked by follower count across the community.</p>

            {error && <p className="community-error">{error}</p>}

            {contributors.length === 0 ? (
                <p className="community-empty">
                    No one has followers yet — be the first to follow a creator from <Link to="/explore">Explore</Link>.
                </p>
            ) : (
                <div className="contributors-list">
                    {contributors.map((c, index) => (
                        <div className="contributor-row" key={c.user._id}>
                            <span className="contributor-rank">
                                {index < 3 ? <FaTrophy className={`rank-icon rank-${index + 1}`} /> : `#${index + 1}`}
                            </span>
                            <div className="contributor-info">
                                <Link to={`/userdata/${c.user._id}`}>{c.user.name}</Link>
                                <span className="contributor-role">{c.user.role}</span>
                            </div>
                            <span className="contributor-count">{c.followersCount} followers</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default Community;
