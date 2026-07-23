import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import { registerUser } from "../../api/authApi";

function Registration({ onAuthSuccess }) {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("learner");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleRegister = async () => {
        const namePattern = /^[A-Za-z ]{3,30}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!namePattern.test(name)) {
            setMessage("Enter a valid name.");
            return;
        }

        if (!emailPattern.test(email)) {
            setMessage("Enter a valid email address.");
            return;
        }

        if (!passwordPattern.test(password)) {
            setMessage("Password must contain 8 characters, uppercase, lowercase, number and special character.");
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            const data = await registerUser({ name, email, password, role });

            localStorage.setItem("token", data.token);
            onAuthSuccess(data.user);

            setMessage("Account created successfully!");
            navigate("/dashboard");
        } catch (error) {
            const serverMessage = error.response?.data?.message;
            setMessage(serverMessage || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1 className="register-title">
                    Join SkillShare Hub
                </h1>
                <p className="register-subtitle">
                    Create an account to start sharing knowledge or learning from the community.
                </p>

                <input
                    className="register-input"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <input
                    className="register-input"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <select
                    className="register-input"
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                >
                    <option value="learner">I'm here to learn</option>
                    <option value="creator">I'm here to share knowledge (Creator)</option>
                </select>

                <input
                    className="register-input"
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    className="register-btn"
                    onClick={handleRegister}
                    disabled={submitting}
                >
                    {submitting ? "Creating Account..." : "Register"}
                </button>

                <p className="register-message">
                    {message}
                </p>

            </div>

        </div>

    );
}

export default Registration;
