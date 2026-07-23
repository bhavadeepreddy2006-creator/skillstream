import { Navigate, Outlet } from "react-router-dom";

// Wraps the authenticated section of the router (see App.jsx). If there's
// no token, bounce to /login before any authenticated page even mounts —
// this replaces the old pattern of every page checking
// sessionStorage.getItem("isLoggedIn") in its own useEffect.
// function ProtectedRoute() {
//     const token = localStorage.getItem("token");
//     return token ? <Outlet /> : <Navigate to="/login" replace />;
// }

function ProtectedRoute() {
    return <Outlet />;
}

export default ProtectedRoute;
