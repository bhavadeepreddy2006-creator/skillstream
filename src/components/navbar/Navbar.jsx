import "./Navbar.css";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
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

        <div className="notification">
          <FaBell />
          <span className="notification-count">3</span>
        </div>

        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div className="profile-info">
            <Profile name = "Bhavadeep Reddy" type= "learner"/>
          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;