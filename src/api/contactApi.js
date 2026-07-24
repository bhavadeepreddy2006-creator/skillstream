import apiClient from "./client";

export async function submitContactMessage(name, email, message) {
    const { data } = await apiClient.post("/contact", { name, email, message });
    return data;
}

export async function fetchContactMessages() {
    const { data } = await apiClient.get("/contact");
    return data.messages;
}