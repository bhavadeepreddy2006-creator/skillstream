import { Link } from "react-router-dom";

function Usertable({users, deleteuser, currentUser}){
    return(

        <div>
            {
                users.length===0 ?
                <h2>No Users Found</h2>
                :
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index)=>(
                                <tr key={user._id}>
                                    <td>{index+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="action-buttons">
                                        <Link
                                            className="view-btn"
                                            to={`/userdata/${user._id}`}
                                        >
                                            View
                                        </Link>
                                        {currentUser && (currentUser.id === user._id || currentUser.role === "admin") && (
                                            <Link
                                                className="edit-btn"
                                                to={`/userdata/edit/${user._id}`}
                                            >
                                                Edit
                                            </Link>
                                        )}
                                        {currentUser && (currentUser.id === user._id || currentUser.role === "admin") && (
                                            <button
                                                className="delete-btn"
                                                onClick={()=>deleteuser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    );
}
export default Usertable;