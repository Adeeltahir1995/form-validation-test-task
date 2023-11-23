import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { ROUTES } from '../contants';
import { User } from '../types';

const initialState: User = {
    id: 0,
    firstName: '',
    lastName: '',
    photo: '',
    gender: 'male',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    city: 'Select City',
    professionalSkills: [],
}

export const formData = {
    cities: [
        'New York', 'Las Vegas', "Miami"
    ],

    professionalSkills: [
        {
            title: "Communicaton",
            value: "communicaton"
        },
        {
            title: "Problem Solving",
            value: "problemSolving"
        },
        {
            title: "Initatve",
            value: "initatve"
        },
        {
            title: "Critical Thinking",
            value: "criticalThinking"
        }
    ]

}

const UserForm: React.FC = () => {
    const navigate = useNavigate()
    const { addUser, updateUser, selectedUser, setSelectedUser } = useContext(UserContext);
    const [user, setUser] = useState<User>(initialState);

    useEffect(() => {
        if (selectedUser) {
            setUser(selectedUser);
        }
    }, [selectedUser]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked, files }: any = e.target;

        if (type === 'checkbox') {
            const skills = [...user.professionalSkills];
            if (checked) {
                skills.push(value);
            } else {
                const index = skills.indexOf(value);
                if (index !== -1) {
                    skills.splice(index, 1);
                }
            }
            setUser({ ...user, professionalSkills: skills });
        } else if (type === 'file') {
            if (files.length > 0) {
                const selectedFile = files[0];
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    const imageDataURL = event.target.result;
                    setUser({ ...user, [name]: imageDataURL });
                };
                reader.readAsDataURL(selectedFile);
            }
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSave = () => {
        if (!user.firstName || !user.lastName || !user.email || !user.mobileNumber || !formData.cities.includes(user.city) || !user.dateOfBirth || !user.professionalSkills.length || !user.photo) {
            alert("Please fill in all required fields.");
            return;
        }
        if (selectedUser) {
            updateUser(user);
            setSelectedUser(null)
        } else {
            addUser(user);
        }
        setUser(initialState);

        navigate(ROUTES.HOME)
    };

    const handleReset = () => {
        setUser(initialState);
    };

    const handleBackClick = () => {
        navigate(-1)
    }


    return (
        <div className="p-4 bg-white rounded shadow md:w-1/2 mx-auto">
            <div className='flex justify-between my-3 align-clean'>
                <button onClick={handleBackClick} className='bg-red-500 text-white px-2 rounded h-8'>Back</button>
                <h2 className="text-2xl mb-4">User Form</h2>
                <span></span>
            </div>
            <form className="space-y-4 w-full">
                <div>
                    <label htmlFor="firstName" className="block font-semibold">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block font-semibold">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="photo" className="block font-semibold">
                        Photo
                    </label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={handleChange}
                        className="border rounded p-1"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Gender</label>
                    <div className="flex space-x-4">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={user.gender === 'male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={user.gender === 'female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block font-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="mobileNumber" className="block font-semibold">
                        Mobile Number
                    </label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={user.mobileNumber}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        maxLength={10}
                    />
                </div>

                <div>
                    <label htmlFor="dateOfBirth" className="block font-semibold">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={user.dateOfBirth}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block font-semibold">
                        City
                    </label>
                    <select
                        id="city"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="Select City">Select City</option>
                        {formData.cities.map(data => <option value={data}>{data}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">Professional Skills</label>
                    {
                        formData.professionalSkills.map(data => <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="professionalSkills"
                                    value={data.value}
                                    checked={user.professionalSkills.includes(data.value)}
                                    onChange={handleChange}
                                />
                                <span className='ml-1'> {data.title}</span>
                            </label>
                        </div>)
                    }

                </div>

                <div className="space-x-2">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;
