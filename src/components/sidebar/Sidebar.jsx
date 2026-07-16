import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBookOpen,
  FaPenAlt,
  FaCompass,
  FaUsers,
  FaBookmark,
  FaBell,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ logout }) {
  return (
    <aside className="leftbar">

      <ul>

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaHome className="menu-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaUser className="menu-icon" />
            <span>My Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaBookOpen className="menu-icon" />
            <span>Knowledge Feed</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/createpost"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaPenAlt className="menu-icon" />
            <span>Create Post</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaCompass className="menu-icon" />
            <span>Explore</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaUsers className="menu-icon" />
            <span>Community</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/savedposts"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaBookmark className="menu-icon" />
            <span>Saved Posts</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaBell className="menu-icon" />
            <span>Notifications</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaChartLine className="menu-icon" />
            <span>Analytics</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaCog className="menu-icon" />
            <span>Settings</span>
          </NavLink>
        </li>

      </ul>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;