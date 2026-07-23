import apiClient from "./client";

export async function toggleLike(postId) {
    const { data } = await apiClient.post(`/like/post/${postId}`);
    return data; // { liked, likesCount }
}

export async function fetchMyLikedPostIds() {
    const { data } = await apiClient.get("/like/mine");
    return data.likedPostIds;
}

export async function toggleSavePost(postId) {
    const { data } = await apiClient.post(`/savedpost/post/${postId}`);
    return data; // { saved }
}

export async function fetchMySavedPosts() {
    const { data } = await apiClient.get("/savedpost/mine");
    return data.posts;
}

export async function fetchMySavedPostIds() {
    const { data } = await apiClient.get("/savedpost/mine/ids");
    return data.savedPostIds;
}
