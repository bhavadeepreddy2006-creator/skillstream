import './home.css';
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Dashboard from '../../components/dashboard/dashboard';

function Home() {
    return(
        <>
        <Navbar/>
        <div className="main">
            {/* <Head/>*/}
            <Sidebar/>
            <Dashboard name = "Bhavadeep Reddy" />
        </div>
        </>
    );
}
export default Home;