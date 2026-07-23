import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserById } from "../../api/userApi";

function Userdetails(){

    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserById(id)
            .then((data) => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if(!user){
        return <h2>No User Found</h2>;
    }

    return(
        <div className="userdata-page">
            <h1>User Details</h1>
            <hr/>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Role : {user.role}</p>
            <p>Joined : {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default Userdetails;
