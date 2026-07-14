import "./profile.css";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-image">
          <FaUserCircle />
        </div>

        <div className="profile-details">

          <h2>Bhavadeep Reddy</h2>

          <p className="profile-role">
            Full Stack Developer | Content Creator
          </p>

          <div className="profile-info">

            <div className="info-box">
              <span className="label">Category</span>
              <span className="value">Technology</span>
            </div>

            <div className="info-box">
              <span className="label">Type</span>
              <span className="value">Mentor</span>
            </div>

            <div className="info-box">
              <span className="label">Experience</span>
              <span className="value">2+ Years</span>
            </div>

            <div className="info-box">
              <span className="label">Location</span>
              <span className="value">Guntur, India</span>
            </div>

          </div>

          <button className="edit-btn">
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;