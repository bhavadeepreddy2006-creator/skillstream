import "./Sidebar.css";

import {
  FaHome,
  FaUserCircle,
  FaBookOpen,
  FaPenAlt,
  FaCompass,
  FaUsers,
  FaBookmark,
  FaBell,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-top">

        <h3 className="sidebar-title">Navigation</h3>

        <ul className="sidebar-menu">

          <li className="active">
            <FaHome className="icon" />
            <span>Dashboard</span>
          </li>

          <li>
            <FaUserCircle className="icon" />
            <span>My Profile</span>
          </li>

          <li>
            <FaBookOpen className="icon" />
            <span>Knowledge Feed</span>
          </li>

          <li>
            <FaPenAlt className="icon" />
            <span>Create Post</span>
          </li>

          <li>
            <FaCompass className="icon" />
            <span>Explore</span>
          </li>

          <li>
            <FaUsers className="icon" />
            <span>Community</span>
          </li>

          <li>
            <FaBookmark className="icon" />
            <span>Saved Posts</span>
          </li>

          <li>
            <FaBell className="icon" />
            <span>Notifications</span>
          </li>

          <li>
            <FaChartBar className="icon" />
            <span>Analytics</span>
          </li>

          <li>
            <FaCog className="icon" />
            <span>Settings</span>
          </li>

        </ul>

      </div>

      <div className="sidebar-bottom">

        <button className="logout-btn">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;