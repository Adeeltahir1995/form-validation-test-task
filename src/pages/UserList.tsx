import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { User } from '../types';
import { ROUTES } from '../contants';
import UserProfileCard from '../components/UserProfileCard';
const UserList: React.FC = () => {
    const navigate = useNavigate()
    const { users, deleteUser, setSelectedUser } = useContext(UserContext);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        navigate(ROUTES.USER_FORM)
    };

    const handleDelete = (user: User) => {
        deleteUser(user.id);
    };
    const handleAddUserClick = () => {
        navigate(ROUTES.USER_FORM)
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            <div className='flex justify-between my-3'>
                <h2 className="text-2xl mb-4">User List</h2>
                <button className='bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded ' onClick={handleAddUserClick}>Add new User</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users.map((user) => <UserProfileCard handleDelete={handleDelete} handleEdit={handleEdit} user={user} />)}
            </div>
        </div>
    );
};

export default UserList;
