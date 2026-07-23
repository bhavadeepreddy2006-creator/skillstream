import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";
import Footer from "../footer/footer";

function Layout({ onLogout, currentUser }){
    const navigate = useNavigate();

    function logout(){
        onLogout();
        navigate("/login");
    }

    return(
        <>
        <div className="body">
            <Navbar/>
            <div className="main">
                <Sidebar logout={logout} currentUser={currentUser}/>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    )
}
export default Layout;
