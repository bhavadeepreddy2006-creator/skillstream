import apiClient from "./client";

export async function fetchMyAnalytics() {
    const { data } = await apiClient.get("/analytics/overview");
    return data; // { totals, postsBreakdown, growth }
}
