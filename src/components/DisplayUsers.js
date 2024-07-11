    import { useEffect, useState } from "react";
    import axios from "axios";
    import '../styles/displayUsers.css'
    import 'bootstrap/dist/css/bootstrap.min.css';
    export default function DisplayUsers() {
        const [users, setUsers] = useState([]);
        useEffect(()=>{
            const fetchUsers = async()=>{
                try{
                    const response = await axios.post('https://mern-app-8.onrender.com/displayUsers')
                    setUsers(response.data)
                }catch(err){
                    console.error('Error Fetching Users: ',err)
                }
            }
        fetchUsers();
        }
    ,[])

    const handleClick = async(userId) =>{
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        }
        );
    
        if (response.ok) {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } else {
            console.error('Error deleting user:', response.statusText);
        }
    }


        return (
                <div className="bigwrapper">
                <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><button type="button" onClick={()=>{handleClick(user._id)}} className="btn btn-danger">Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
        );
    }
