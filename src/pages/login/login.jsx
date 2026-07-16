import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!emailPattern.test(email)) {
            setMessage("Invalid Email Address");
            return;
        }

        if (!passwordPattern.test(password)) {
            setMessage(
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
            );
            return;
        }

        setMessage("");
        // onLogin();
        navigate('/dashboard');
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    Placement Management System
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
                >
                    Login
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