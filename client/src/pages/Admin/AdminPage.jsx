import React, { useState, useEffect } from 'react';
import Card from '../../components/UserCard/Card';
import { useUser } from '../../context/userContext';
import styles from './AdminPage.css';

const AdminPage = () => {
    const { users, fetchAllUsers, deleteUser, error, totalUsersCount } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        fetchAllUsers(currentPage, usersPerPage);
    }, []);
    const handleDelete = async (userId) => {
        await deleteUser(userId);
        fetchAllUsers(currentPage, usersPerPage);
    };

    const totalPages = Math.ceil(totalUsersCount / usersPerPage);

    const renderPagination = () => (
        <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? styles.active : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );

    return (
        <div className={styles.adminPage} data-cy="admin-page">
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.container}>
                {users.map((user) => (
                    <Card
                        key={user._id}
                        name={user.fullname}
                        role={user.role}
                        phone={user.phone_number || 'N/A'}
                        onDelete={() => handleDelete(user._id)}
                    />
                ))}
            </div>
            {renderPagination()}
        </div>
    );
};

export default AdminPage;
