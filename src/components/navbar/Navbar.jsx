import "./Navbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUnreadCount } from "../../api/notificationApi";

function Navbar() {

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount()
      .then((count) => setUnreadCount(count))
      .catch(() => {
        // Non-critical — the badge just won't show a count if this fails.
      });
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-section">
        <h2>
          Skill<span>Share</span> Hub
        </h2>
      </div>

      {/* Search */}
      <div className="search-section">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search skills, creators, posts..."
        />
      </div>

      {/* Right Section */}
      <div className="right-section">

        <Link to="/notifications" className="notification">
          <FaBell />
          {unreadCount > 0 && <span className="notification-count">{unreadCount > 9 ? "9+" : unreadCount}</span>}
        </Link>

        <Link to="/profile" className="profile">
          <FaUserCircle className="profile-icon" />
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
