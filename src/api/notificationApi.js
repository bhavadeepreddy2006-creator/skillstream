import apiClient from "./client";

export async function fetchMyNotifications(page = 1) {
    const { data } = await apiClient.get("/notification", { params: { page, limit: 20 } });
    return data; // { notifications, pagination }
}

export async function fetchUnreadCount() {
    const { data } = await apiClient.get("/notification/unread-count");
    return data.count;
}

export async function markNotificationAsRead(id) {
    const { data } = await apiClient.put(`/notification/${id}/read`);
    return data.notification;
}

export async function markAllNotificationsAsRead() {
    const { data } = await apiClient.put("/notification/read-all");
    return data;
}
