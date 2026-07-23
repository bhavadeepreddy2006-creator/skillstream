import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";

function Login({ onAuthSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setMessage("Invalid Email Address");
            return;
        }

        if (!password) {
            setMessage("Password is required");
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            const data = await loginUser({ email, password });
            localStorage.setItem("token", data.token);
            onAuthSuccess(data.user);
            navigate("/dashboard");
        } catch (error) {
            const serverMessage = error.response?.data?.message;
            setMessage(serverMessage || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    SkillShare Hub
                </h1>

                <input
                    className="login-input"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="login-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Hide Password" : "Show Password"}
                </button>

                <button
                    className="login-btn"
                    onClick={handleLogin}
                    disabled={submitting}
                >
                    {submitting ? "Logging in..." : "Login"}
                </button>

                {
                    message && (
                        <p className="login-message">
                            {message}
                        </p>
                    )
                }

            </div>

        </div>
    );
}

export default Login;
