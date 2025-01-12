import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import { FaInfo } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa6';
import { FaUserPen } from 'react-icons/fa6';
import ActionIcons from '../common/ActionIcons';


function UserList({ search }) {

    const { users, getUsers } = useContext(UserContext);
    const [filteredUsers, setFilteredUsers] = useState(users);

    

    useEffect(() => {        
        getUsers();                       
    }, []);

    useEffect(() => {

        if(search){
            setFilteredUsers(users.filter((user) => (
                user.username.toLowerCase().includes(search.toLowerCase())
            )))
        } else {
            setFilteredUsers(users);
        }

    }, [search,users]);


    
    

    return (
        <div className="container mx-auto">
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th className="text-center">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers && filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={user.id} className="hover hover:cursor-pointer">
                                    <th className="text-center">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age || 'N/A'}</td>
                                    <td>
                                        <ActionIcons user = {user} userId = {user.id}/>                                        
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList;
