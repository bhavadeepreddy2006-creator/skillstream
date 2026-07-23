import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../api/userApi";
import { fetchFeed, fetchTrendingTechnologies } from "../../api/postApi";
import { fetchTopContributors } from "../../api/followApi";
import {
  FaUsers,
  FaUserTie,
  FaBookOpen,
  FaUserCircle,
} from "react-icons/fa";

function Dashboard({ currentUser }) {

  const navigate = useNavigate();
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalCreators, setTotalCreators] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [featuredCreators, setFeaturedCreators] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  // Auth is already enforced by ProtectedRoute (App.jsx) before this page
  // ever mounts, so there's no login-status check needed here anymore.
  useEffect(() => {
    fetchUsers()
      .then((users) => {
        setTotalMembers(users.length);
        setTotalCreators(users.filter((u) => u.role === "creator").length);
      })
      .catch(() => {});

    fetchFeed({ limit: 1 })
      .then((data) => setTotalPosts(data.pagination.total))
      .catch(() => {});

    fetchFeed({ limit: 2, sort: "latest" })
      .then((data) => setRecentPosts(data.posts))
      .catch(() => {});

    fetchTrendingTechnologies(8)
      .then((data) => setTrendingSkills(data))
      .catch(() => {});

    fetchTopContributors(3)
      .then((data) => setFeaturedCreators(data))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-banner">

        <div>
          <h2>Welcome Back, {currentUser?.name || "there"} 👋</h2>

          <p>
            Share knowledge, inspire learners, and grow your professional
            community.
          </p>
        </div>

        <button onClick={() => navigate("/createpost")}>Create Post</button>

      </div>

      {/* Statistics */}

      <div className="stats-container">

        <div className="card" onClick={()=>navigate("/userdata")}>
          <FaUsers className="card-icon" />
          <h2>{totalMembers}</h2>
          <p>Community Members</p>
          <button>View Members</button>
        </div>

        <div className="card" onClick={()=>navigate("/explore")}>
          <FaUserTie className="card-icon" />
          <h2>{totalCreators}</h2>
          <p>Creators</p>
          <button>View Creators</button>
        </div>

        <div className="card" onClick={()=>navigate("/feed")}>
          <FaBookOpen className="card-icon" />
          <h2>{totalPosts}</h2>
          <p>Knowledge Posts</p>
          <button>Read Posts</button>
        </div>

      </div>

      {/* Trending Skills */}
      {trendingSkills.length > 0 && (
        <div className="section">
          <h3>🔥 Trending Skills</h3>
          <div className="skills">
            {trendingSkills.map((skill) => (
              <span key={skill.name}>{skill.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* Featured Creators */}
      {featuredCreators.length > 0 && (
        <div className="section">
          <h3>⭐ Featured Creators</h3>
          <div className="creator-container">
            {featuredCreators.map((c) => (
              <div className="creator-card" key={c.user._id}>
                <FaUserCircle className="creator-card-icon" />
                <h4>{c.user.name}</h4>
                <span>{c.followersCount} followers</span>
                <button onClick={() => navigate(`/userdata/${c.user._id}`)}>View Profile</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="section">
          <h3>📚 Recent Knowledge Posts</h3>
          {recentPosts.map((post) => (
            <Link className="post" to={`/post/${post._id}`} key={post._id}>
              <h4>{post.title}</h4>
              {post.description && <p>{post.description}</p>}
              <small>By {post.author?.name} · {new Date(post.createdAt).toLocaleDateString()}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
