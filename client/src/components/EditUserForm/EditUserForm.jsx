import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext.js';
import styles from './EditUserForm.module.css';

const EditUserForm = () => {
    const { updateProfile, fetchUserById, error } = useUser();
    const userId = JSON.parse(sessionStorage.getItem('session'))?.id;
    const [formData, setFormData] = useState({
        fullname: '',
        phone_number: '',
        email: '',
        password: '',
        years: '',
        subject: '',
        image: null,
    });
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = await fetchUserById(userId);
                setFormData({
                    fullname: user.fullname || '',
                    phone_number: user.phone_number || '',
                    email: user.email || '',
                    password: '',
                    years: user.years || '',
                    subject: user.subject || '',
                    image: null,
                });
            } catch (err) {
                console.error('Error loading user data:', err);
            }
        };

        loadUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                image: files[0],
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profileData = new FormData();

        for (const key in formData) {
            profileData.append(key, formData[key]);
        }

        try {
            await updateProfile(userId, profileData);
            alert('Profile updated successfully');
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2>Edit Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.divideGroup}>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Fullname"
                        />
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Phone number"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="*********"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <select name="years" className={styles.years}>
                            <option value="">Age of child</option>
                            {[...Array(14).keys()].map((i) => (
                                <option key={i} value={6 + i}>
                                    {6 + i}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
            <div className={styles.imgContainer}>
                <input type="file" name="image" onChange={handleChange} accept="image/*" />
                {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Profile Preview" />}
            </div>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default EditUserForm;
