import "./footer.css";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-section">

          <h2>
            Skill<span>Share</span> Hub
          </h2>

          <p>
            Empowering professionals, mentors, trainers, and learners
            through collaborative knowledge sharing and continuous learning.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <ul>

            <li>Dashboard</li>
            <li>Explore</li>
            <li>Create Post</li>
            <li>Community</li>

          </ul>

        </div>

        {/* Resources */}

        <div className="footer-section">

          <h3>Resources</h3>

          <ul>

            <li>About Us</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-section">

          <h3>Connect</h3>

          <div className="social-icons">

            <FaGithub />
            <FaLinkedin />
            <FaEnvelope />
            <FaGlobe />

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} SkillShare Hub. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;