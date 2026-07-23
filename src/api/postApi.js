import apiClient from "./client";

export async function fetchTrendingTechnologies(limit = 8) {
    const { data } = await apiClient.get("/post/trending-technologies", { params: { limit } });
    return data.technologies;
}

export async function fetchFeed({ page = 1, limit = 10, category, technology, tag, search, sort } = {}) {
    const { data } = await apiClient.get("/post", {
        params: { page, limit, category, technology, tag, search, sort },
    });
    return data; // { posts, pagination }
}

export async function fetchMyPosts() {
    const { data } = await apiClient.get("/post/mine");
    return data.posts;
}

export async function fetchPostById(id) {
    const { data } = await apiClient.get(`/post/${id}`);
    return data.post;
}

// `postData` is a plain object; technologies/tags are arrays and get
// JSON-stringified since this goes over multipart form data (needed for
// the optional thumbnail file).
export async function createPost(postData, thumbnailFile) {
    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
        } else if (value !== undefined) {
            formData.append(key, value);
        }
    });
    if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
    }

    const { data } = await apiClient.post("/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data.post;
}

export async function updatePost(id, postData, thumbnailFile) {
    const formData = new FormData();
    Object.entries(postData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
        } else if (value !== undefined) {
            formData.append(key, value);
        }
    });
    if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
    }

    const { data } = await apiClient.put(`/post/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data.post;
}

export async function deletePost(id) {
    const { data } = await apiClient.delete(`/post/${id}`);
    return data;
}
