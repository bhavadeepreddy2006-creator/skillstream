import "./userdata.css";
import { useEffect, useState } from "react";
import Usertable from "../../components/userdata/usertable";
import { fetchUsers, deleteUserApi } from "../../api/userApi";

function Userdata({ currentUser }) {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers()
            .then((data) => setUsers(data))
            .catch(() => setError("Could not load members. Please try again."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Loading Users...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading">
                <h2>{error}</h2>
            </div>
        );
    }

    async function deleteuser(id) {
        try {
            await deleteUserApi(id);
            setUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete this user.");
        }
    }

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="userdata-page">

            <div className="userdata-header">

                <h1 className="userdata-title">
                    Community Members
                </h1>

                <input
                    className="search-box"
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="user-table-container">
                <Usertable users={filteredUsers} deleteuser={deleteuser} currentUser={currentUser}/>
            </div>

        </div>
    );
}

export default Userdata;
