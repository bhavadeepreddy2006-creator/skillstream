import "./settings.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, deleteMyAccount } from "../../api/settingsApi";

function Settings({ onLogout }) {
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);

    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");
    const [deleting, setDeleting] = useState(false);

    async function handleChangePassword(e) {
        e.preventDefault();
        setPasswordMessage("");
        setChangingPassword(true);
        try {
            await changePassword(currentPassword, newPassword);
            setPasswordMessage("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            setPasswordMessage(error.response?.data?.message || "Could not update password.");
        } finally {
            setChangingPassword(false);
        }
    }

    async function handleDeleteAccount() {
        setDeleteMessage("");
        setDeleting(true);
        try {
            await deleteMyAccount();
            onLogout();
            navigate("/login");
        } catch (error) {
            setDeleteMessage(error.response?.data?.message || "Could not delete your account.");
            setDeleting(false);
        }
    }

    return (
        <div className="settings-page">

            <h1>Settings</h1>

            <div className="settings-card">
                <h3>Change Password</h3>
                <form onSubmit={handleChangePassword}>
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />

                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="8+ characters, upper, lower, number, symbol"
                        required
                    />

                    {passwordMessage && <p className="settings-message">{passwordMessage}</p>}

                    <button type="submit" className="settings-btn" disabled={changingPassword}>
                        {changingPassword ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>

            <div className="settings-card danger-zone">
                <h3>Delete Account</h3>
                <p>
                    This permanently deletes your account, profile, posts, comments, likes, saves,
                    follows, and notifications. This cannot be undone.
                </p>

                <label>Type <strong>DELETE</strong> to confirm</label>
                <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="DELETE"
                />

                {deleteMessage && <p className="settings-message">{deleteMessage}</p>}

                <button
                    className="delete-account-btn"
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== "DELETE" || deleting}
                >
                    {deleting ? "Deleting..." : "Permanently Delete My Account"}
                </button>
            </div>

        </div>
    );
}

export default Settings;
