import apiClient from "./client";

export async function reportPost(postId, reason) {
    const { data } = await apiClient.post(`/report/post/${postId}`, { reason });
    return data;
}

export async function fetchReports(status = "pending") {
    const { data } = await apiClient.get("/report", { params: { status } });
    return data.reports;
}

export async function resolveReportApi(reportId) {
    const { data } = await apiClient.put(`/report/${reportId}/resolve`);
    return data;
}
