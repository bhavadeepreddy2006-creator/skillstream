import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={{textAlign:"center", padding:"80px 20px"}}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Go back home</Link>
        </div>
    );
}

export default NotFound;
