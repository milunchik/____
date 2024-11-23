import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext.js';
import styles from './EditTeacherForm.module.css';
import { subjects } from '../../../assets/subjects-constants.js';

const EditTeacherForm = () => {
    const { fetchUserById, updateProfile } = useUser();
    
    const userId = JSON.parse(sessionStorage.getItem('session'))?.id;

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        password: '',
        subject: '',
        price: '',
        experience: '',
        description: '',
        image: null,
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const data = await fetchUserById(userId);
                setFormData({
                    fullname: data.fullname || '',
                    email: data.email || '',
                    phone_number: data.phone_number || '',
                    password: '',
                    subject: data.lesso || '',
                    price: data.price || '',
                    experience: data.experience || '',
                    description: data.description || '',
                    image: data.image || null,
                });
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeacherData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFormData((prevData) => ({
                ...prevData,
                image: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const result = await updateProfile(userId, formDataToSend);
            console.log('Profile updated successfully:', result);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContainer}>
                <h2>Edit account</h2>
                <form onSubmit={handleSubmit} className={styles.editForm}>
                    <div className={styles.divideGroup}>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Fullname"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Phone number"
                        />
                        <input type="password" name="password" onChange={handleChange} placeholder="********" />
                    </div>
                    <div className={styles.divideGroup}>
                        <select name="subject" value={formData.subject} onChange={handleChange}>
                            <option value="" disabled>
                                Select a subject
                            </option>
                            {subjects.map((subject) => (
                                <option value={subject.name}>{subject.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Choose price"
                        />
                    </div>
                    <div className={styles.divideGroup}>
                        <textarea
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="Write about your experience"
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write a short description about you"
                        />
                    </div>
                    <div className={styles.imgContainer}>
                        <input type="file" name="image" onChange={handleImageChange} />
                        {selectedImage && <img src={selectedImage} alt="Profile preview" />}
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditTeacherForm;
