import {useParams,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import "../registration/registration.css";
import { fetchUserById, updateUserApi } from "../../api/userApi";

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUserById(id)
            .then((user) => {
                setName(user.name);
                setEmail(user.email);
            })
            .catch(() => setMessage("Could not load this user."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    async function updateUser(e){
        e.preventDefault();
        try {
            await updateUserApi(id, { name, email });
            navigate("/userdata");
        } catch (err) {
            setMessage(err.response?.data?.message || "Could not update this user.");
        }
    };

    return(
        <div className="register-container">
        <div className="register-card">
        <h1 className="register-title">Edit User</h1>
        <form onSubmit={updateUser}>
            <input className="register-input" value={name}
            onChange={(e)=>setName(e.target.value)} placeholder="Name" />
            <input className="register-input" value={email}
            onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            <button type="submit" className="register-btn">
            Update User
            </button>
            {message && <p className="register-message">{message}</p>}
        </form>
        </div>
        </div>
    )
};
export default EditUser;
