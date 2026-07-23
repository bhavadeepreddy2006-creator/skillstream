import apiClient from "./client";

export async function fetchMyProfile() {
    const { data } = await apiClient.get("/creator-profile/me");
    return data.profile;
}

export async function fetchProfileByUserId(userId) {
    const { data } = await apiClient.get(`/creator-profile/${userId}`);
    return data.profile;
}

export async function updateMyProfile(updates) {
    const { data } = await apiClient.put("/creator-profile/me", updates);
    return data.profile;
}

export async function uploadMyProfilePhoto(file) {
    const formData = new FormData();
    formData.append("photo", file);
    const { data } = await apiClient.post("/creator-profile/me/profile-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data.profilePhoto;
}

export async function uploadMyCoverPhoto(file) {
    const formData = new FormData();
    formData.append("photo", file);
    const { data } = await apiClient.post("/creator-profile/me/cover-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data.coverPhoto;
}
