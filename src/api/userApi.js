import apiClient from "./client";

export async function fetchUsers() {
    const { data } = await apiClient.get("/user");
    return data.users;
}

export async function fetchUserById(id) {
    const { data } = await apiClient.get(`/user/${id}`);
    return data.user;
}

export async function updateUserApi(id, updates) {
    const { data } = await apiClient.put(`/user/${id}`, updates);
    return data.user;
}

export async function deleteUserApi(id) {
    const { data } = await apiClient.delete(`/user/${id}`);
    return data;
}
