import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const userActions = useProvideUser();
    return <UserContext.Provider value={userActions}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};

const useProvideUser = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState('');

    const fetchAllUsers = async (page = 1, limit = 8) => {
        try {
            setError('');
            const response = await fetch(`http://localhost:3000/users?page=${page}&limit=${limit}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Could not load users');
        }
    };

    const fetchTeachers = async (subject) => {
        try {
            setError('');
            const response = await fetch('http://localhost:3000/teachers', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to fetch teachers');

            const data = await response.json();

            const filteredTeachers = subject
                ? data.filter((teacher) => teacher.lessons.toLowerCase() === subject.toLowerCase())
                : data;

            setTeachers(filteredTeachers);
        } catch (err) {
            console.error('Error fetching teachers:', err);
            setError('Could not load teachers');
        }
    };

    const fetchUserById = async (userId) => {
        try {
            setError('');
            const response = await fetch(`http://localhost:3000/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch user');
            const data = await response.json();
            setUser(data);
            return data;
        } catch (err) {
            console.error('Error fetching user by ID:', err);
            setError('Could not load user');
        }
    };

    const deleteUser = async (userId) => {
        try {
            setError('');
            const response = await fetch(`http://localhost:3000/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to delete user');
            setUser(null);
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Could not delete user');
        }
    };

    const updateProfile = async (userId, profileData) => {
        try {
            setError('');
            const response = await fetch(`http://localhost:3000/${userId}`, {
                method: 'PUT',
                body: profileData,
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to update profile');
            const updatedUser = await response.json();
            setUser(updatedUser);
            return updatedUser;
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Could not update profile');
        }
    };
    useEffect(() => {
        return () => setTeachers([]);
    }, []);

    return {
        user,
        fetchAllUsers,
        fetchTeachers,
        deleteUser,
        updateProfile,
        fetchUserById,
        teachers,
        error,
        setUser,
        users,
    };
};
