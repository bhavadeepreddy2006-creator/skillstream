const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Backend stores/returns photo paths as "/uploads/profile-photos/xyz.jpg" —
// this just prefixes the API's origin so <img src> can load it.
export function resolveMediaUrl(relativePath) {
    if (!relativePath) return "";
    return `${API_BASE}${relativePath}`;
}
