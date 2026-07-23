import apiClient from "./client";

export async function changePassword(currentPassword, newPassword) {
    const { data } = await apiClient.put("/auth/change-password", { currentPassword, newPassword });
    return data;
}

export async function deleteMyAccount() {
    const { data } = await apiClient.delete("/auth/me");
    return data;
}
