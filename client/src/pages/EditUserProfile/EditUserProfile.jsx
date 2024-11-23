import React from 'react';
import EditUserForm from '../../components/EditUserForm/EditUserForm';
import styles from './EditUserProfile.css';

const EditUserProfile = () => {
    return (
        <div className={styles.editPage} data-cy="edit-page">
            1
            <div className={styles.editContainer}>
                <EditUserForm />
            </div>
        </div>
    );
};

export default EditUserProfile;
