import React, { useState } from 'react';
import { useUser } from '../../context/userContext';
import EditTeacherForm from '../../components/EditTeacherForm/EditTeacherForm';
import styles from './EditTeacherProfile.css';

const EditTeacherProfile = () => {
    const { handleUpdateProfile } = useUser();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async (profileData) => {
        try {
            await handleUpdateProfile(profileData.userId, profileData);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className={styles.editTeacherProfile} data-cy="edit-teacher-page">
            <div className={styles.editTeacherProfile__content}>
                <div className={styles.formContainer}>
                    <EditTeacherForm onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default EditTeacherProfile;
