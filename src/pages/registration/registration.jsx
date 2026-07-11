import { useState } from "react";
import "./Registration.css";

function Registration() {

    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [branch, setBranch] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = () => {

        const namePattern = /^[A-Za-z ]{3,30}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[6-9]\d{9}$/;
        const branchPattern = /^[A-Za-z ]{2,20}$/;
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!namePattern.test(studentName)) {
            setMessage("Enter a valid student name.");
            return;
        }

        if (!emailPattern.test(email)) {
            setMessage("Enter a valid email address.");
            return;
        }

        if (!phonePattern.test(phone)) {
            setMessage("Enter a valid 10-digit phone number.");
            return;
        }

        if (!branchPattern.test(branch)) {
            setMessage("Enter a valid branch name.");
            return;
        }

        if (!passwordPattern.test(password)) {
            setMessage("Password must contain 8 characters, uppercase, lowercase, number and special character.");
            return;
        }

        setMessage("Registration Successful");
    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1 className="register-title">
                    Student Registration
                </h1>

                <input
                    className="register-input"
                    type="text"
                    placeholder="Enter Student Name"
                    value={studentName}
                    onChange={(e)=>setStudentName(e.target.value)}
                />

                <input
                    className="register-input"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    className="register-input"
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                />

                <input
                    className="register-input"
                    type="text"
                    placeholder="Enter Branch"
                    value={branch}
                    onChange={(e)=>setBranch(e.target.value)}
                />

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
                >
                    Register
                </button>

                <p className="register-message">
                    {message}
                </p>

            </div>

        </div>

    );
}

export default Registration;