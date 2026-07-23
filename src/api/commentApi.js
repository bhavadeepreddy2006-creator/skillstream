import apiClient from "./client";

export async function fetchCommentsForPost(postId) {
    const { data } = await apiClient.get(`/comment/post/${postId}`);
    return data.comments;
}

export async function addComment(postId, content) {
    const { data } = await apiClient.post(`/comment/post/${postId}`, { content });
    return data.comment;
}

export async function deleteComment(commentId) {
    const { data } = await apiClient.delete(`/comment/${commentId}`);
    return data;
}
