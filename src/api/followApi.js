import apiClient from "./client";

export async function followUser(userId) {
    const { data } = await apiClient.post(`/follow/${userId}`);
    return data;
}

export async function unfollowUser(userId) {
    const { data } = await apiClient.delete(`/follow/${userId}`);
    return data;
}

export async function fetchFollowStatus(userId) {
    const { data } = await apiClient.get(`/follow/status/${userId}`);
    return data; // { isFollowing, followersCount, followingCount }
}

export async function fetchMyFollowingIds() {
    const { data } = await apiClient.get("/follow/following");
    return data.followingIds;
}

export async function fetchTopContributors(limit = 10) {
    const { data } = await apiClient.get("/follow/top-contributors", { params: { limit } });
    return data.contributors;
}
