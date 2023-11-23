import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {User} from "../types"

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  users: User[];
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
  updateUser: (user: User) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

const initialContext: UserContextType = {
  users: [],
  addUser: () => { },
  deleteUser: () => { },
  updateUser: () => { },
  selectedUser: null,
  setSelectedUser: () => { },
};

export const UserContext = createContext<UserContextType>(initialContext);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("usser", users)
  }, [users])

  const addUser = (user: User) => {
    const id = Math.random() * 1000;
    const newUser = { ...user, id };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const updateUser = (user: User) => {
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        deleteUser,
        updateUser,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
