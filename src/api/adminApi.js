import apiClient from "./client";

export async function fetchAdminOverview() {
    const { data } = await apiClient.get("/admin/overview");
    return data.overview;
}

export async function updateUserRoleApi(userId, role) {
    const { data } = await apiClient.put(`/user/${userId}/role`, { role });
    return data.user;
}

export async function fetchAllPostsAdmin(page = 1, limit = 20) {
    const { data } = await apiClient.get("/post/admin/all", { params: { page, limit } });
    return data; // { posts, pagination }
}
