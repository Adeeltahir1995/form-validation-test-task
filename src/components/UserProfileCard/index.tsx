import React from 'react'
import { User } from '../../types'
import { formData } from '../../pages/UserForm'

interface UserProfileCardProps {
  user: User
  handleEdit: (user: User) => void
  handleDelete: (id: User) => void
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, handleEdit, handleDelete }) => {
  return (

    <div key={user.id} className="border p-4 rounded bg-gray-50 flex flex-col justify-between">
      <div >
        <div className="mb-2">
          <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} className="w-20 h-20 object-cover rounded-full" />
        </div>
        <h3 className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-gray-500">Email: {user.email}</p>
        <p className="text-gray-500">Gender: {user.gender}</p>
        <p className="text-gray-500">Mobile No: {user.mobileNumber}</p>
        <p className="text-gray-500">DOB: {user.dateOfBirth}</p>
        <p className="text-gray-500">City: {user.city}</p>
        <p className="text-gray-500 ">Professional Skills: </p>
        <div className='flex flex-wrap gap-1'>{user.professionalSkills.map(d => <div className='bg-blue-500 rounded text-white p-2 text-sm w-auto'>{formData.professionalSkills.find(data => data.value === d)?.title}</div>)}</div>

      </div>
      <div className="flex justify-end my-2 gap-2">
        <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900">
          Edit
        </button>
        <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-900 ml-2">
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserProfileCard