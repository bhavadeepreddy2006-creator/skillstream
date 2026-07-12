import "./Dashboard.css";
import {
  FaUsers,
  FaUserTie,
  FaChalkboardTeacher,
  FaLightbulb,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";

function Dashboard({name}) {
  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-banner">

        <div>
          <h2>Welcome Back, {name} 👋</h2>

          <p>
            Share knowledge, inspire learners, and grow your professional
            community.
          </p>
        </div>

        <button>Create Post</button>

      </div>

      {/* Statistics */}

      <div className="stats-container">

        <div className="card">
          <FaUsers className="card-icon" />
          <h2>1250</h2>
          <p>Community Members</p>
          <button>View Members</button>
        </div>

        <div className="card">
          <FaUserTie className="card-icon" />
          <h2>320</h2>
          <p>Creators</p>
          <button>View Creators</button>
        </div>

        <div className="card">
          <FaChalkboardTeacher className="card-icon" />
          <h2>110</h2>
          <p>Mentors & Trainers</p>
          <button>Explore</button>
        </div>

        <div className="card">
          <FaLightbulb className="card-icon" />
          <h2>75</h2>
          <p>Knowledge Contributors</p>
          <button>Explore</button>
        </div>

        <div className="card">
          <FaBookOpen className="card-icon" />
          <h2>2480</h2>
          <p>Knowledge Posts</p>
          <button>Read Posts</button>
        </div>
        
        <div className="card">
          <FaChartLine className="card-icon" />
          <h2>156</h2>
          <p>Skills Covered</p>
          <button>View Skills</button>
        </div>
      </div>
      {/* Trending Skills */}
      <div className="section">
        <h3>🔥 Trending Skills</h3>
        <div className="skills">
          <span>React</span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>Java</span>
          <span>Python</span>
          <span>SAP</span>
          <span>AI</span>
          <span>Cloud</span>
        </div>
      </div>
      {/* Featured Creators */}
      <div className="section">
        <h3>⭐ Featured Creators</h3>
        <div className="creator-container">
          <div className="creator-card">
            <img
              src="src\assets\user.png"
              alt="creator"
            />
            <h4>John Doe</h4>
            <p>Senior MERN Developer</p>
            <span>Mentor • Trainer</span>
            <button>View Profile</button>
          </div>
          <div className="creator-card">
            <img
              src="src\assets\user.png"
              alt="creator"
            />
            <h4>Sarah Lee</h4>
            <p>SAP Consultant</p>
            <span>Knowledge Contributor</span>
            <button>View Profile</button>
          </div>
          <div className="creator-card">
            <img
              src="src\assets\user.png"
              alt="creator"
            />
            <h4>David Kumar</h4>
            <p>AI Research Engineer</p>
            <span>Mentor</span>
            <button>View Profile</button>
          </div>
        </div>
      </div>
      {/* Recent Posts */}
      <div className="section">
        <h3>📚 Recent Knowledge Posts</h3>
        <div className="post">
          <h4>Building Secure Authentication using JWT</h4>
          <p>
            Learn how to implement secure authentication in MERN applications
            using JWT and refresh tokens.
          </p>
          <small>By John Doe • 2 Hours Ago</small>
        </div>
        <div className="post">
          <h4>React Performance Optimization</h4>
          <p>
            Improve your React application's performance using memoization,
            lazy loading, and code splitting.
          </p>
          <small>By Sarah Lee • Yesterday</small>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;