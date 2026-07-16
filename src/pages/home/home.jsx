import "./home.css";
import { Link } from "react-router-dom";
import {
    FaLaptopCode,
    FaArrowRight,
    FaBars
} from "react-icons/fa";

function Home() {

    return (

        <div className="home">

            {/* ================= NAVBAR ================= */}

            <nav className="home-navbar">

                <div className="logo">
                    Skill<span>Share</span> Hub
                </div>

                <ul className="nav-links">

                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/explore">Explore</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>

                </ul>

                <div className="nav-buttons">

                    <Link to="/login">
                        <button className="login-btn">
                            Login
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="register-btn">
                            Join Now
                        </button>
                    </Link>

                </div>

                <div className="menu-icon">
                    <FaBars />
                </div>

            </nav>

            {/* ================= HERO ================= */}

            <section className="hero">

                <div className="hero-left">

                    <p className="hero-tag">
                        Community Driven Learning Platform
                    </p>

                    <h1>

                        Knowledge Has More Value

                        <br />

                        <span>When It's Shared.</span>

                    </h1>

                    <p className="hero-text">

                        SkillShare Hub connects professionals,
                        mentors, trainers, developers and learners
                        through practical knowledge, industry
                        experience and collaborative learning.

                    </p>

                    <div className="hero-buttons">

                        <button className="primary-btn">
                            Join Community
                        </button>

                        <button className="secondary-btn">

                            Explore Knowledge

                            <FaArrowRight />

                        </button>

                    </div>

                </div>

                <div className="hero-right">

                    <FaLaptopCode />

                </div>

            </section>

        </div>

    );

}

export default Home;