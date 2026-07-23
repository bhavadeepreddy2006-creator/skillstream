import { useState } from "react";
import "./contact.css";

function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.trim().length < 3) {
            setStatus("Enter a valid name.");
            return;
        }

        if (!emailPattern.test(email)) {
            setStatus("Enter a valid email address.");
            return;
        }

        if (message.trim().length < 10) {
            setStatus("Message must be at least 10 characters.");
            return;
        }

        setStatus("Thanks for reaching out! We'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="contact-container">

            <div className="contact-card">

                <h1 className="contact-title">Contact Us</h1>

                <input
                    className="contact-input"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="contact-input"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <textarea
                    className="contact-textarea"
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button className="contact-btn" onClick={handleSubmit}>
                    Send Message
                </button>

                <p className="contact-message">{status}</p>

            </div>

        </div>
    );
}

export default Contact;
