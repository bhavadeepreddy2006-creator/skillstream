import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";
import Footer from "../footer/footer";

function Layout(){
    return(
        <>
        <div className="body">
            <Navbar/>
            <div className="main">
                <Sidebar/>
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