import "./notifications.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../../api/notificationApi";
import { FaUserPlus, FaHeart, FaComment } from "react-icons/fa";

const ICONS = {
    follow: <FaUserPlus className="notif-icon notif-icon-follow" />,
    like: <FaHeart className="notif-icon notif-icon-like" />,
    comment: <FaComment className="notif-icon notif-icon-comment" />,
};

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyNotifications()
            .then((data) => setNotifications(data.notifications))
            .catch(() => setError("Could not load notifications."))
            .finally(() => setLoading(false));
    }, []);

    async function handleClickNotification(notification) {
        if (!notification.isRead) {
            try {
                await markNotificationAsRead(notification._id);
                setNotifications((prev) =>
                    prev.map((n) => (n._id === notification._id ? { ...n, isRead: true } : n))
                );
            } catch {
                // Non-critical — navigation still proceeds via the Link even if this fails.
            }
        }
    }

    async function handleMarkAllRead() {
        try {
            await markAllNotificationsAsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        } catch (err) {
            setError(err.response?.data?.message || "Could not mark all as read.");
        }
    }

    if (loading) return <h2>Loading notifications...</h2>;

    const hasUnread = notifications.some((n) => !n.isRead);

    return (
        <div className="notifications-page">

            <div className="notifications-header">
                <h1>Notifications</h1>
                {hasUnread && (
                    <button className="mark-all-btn" onClick={handleMarkAllRead}>
                        Mark all as read
                    </button>
                )}
            </div>

            {error && <p className="notifications-error">{error}</p>}

            {notifications.length === 0 ? (
                <p className="notifications-empty">You're all caught up — no notifications yet.</p>
            ) : (
                <div className="notifications-list">
                    {notifications.map((notification) => {
                        // Comment/like notifications link to the post; follow
                        // notifications link to the follower's profile.
                        const linkTo = notification.post
                            ? `/post/${notification.post}`
                            : notification.sender
                                ? `/userdata/${notification.sender._id}`
                                : "#";

                        return (
                            <Link
                                to={linkTo}
                                key={notification._id}
                                className={`notification-item ${notification.isRead ? "" : "unread"}`}
                                onClick={() => handleClickNotification(notification)}
                            >
                                {ICONS[notification.type]}
                                <div className="notification-body">
                                    <p>{notification.message}</p>
                                    <span>{new Date(notification.createdAt).toLocaleString()}</span>
                                </div>
                                {!notification.isRead && <span className="unread-dot" />}
                            </Link>
                        );
                    })}
                </div>
            )}

        </div>
    );
}

export default Notifications;
