import React, { useState, useEffect } from 'react';
import styles from './Questionary.module.css';
import { useUser } from '../../context/userContext';
import { useQuestionary } from '../../context/questionaryContext';

const Questionary = () => {
    const { fetchTeachers, teachers, error: loadError } = useUser();
    const { createQuestionaries } = useQuestionary();
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        age: '',
        teacher: '',
        subject: '',
        description: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTeachers = async () => {
            try {
                await fetchTeachers();
                setIsDataFetched(true);
            } catch (err) {
                setError('Could not load data');
            }
        };
        if (!isDataFetched) {
            loadTeachers();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createQuestionaries(
                formData.email,
                formData.fullname,
                formData.phone_number,
                formData.age,
                formData.teacher,
                formData.subject,
                formData.description,
            );

            setFormData({
                fullname: '',
                email: '',
                phone_number: '',
                age: '',
                teacher: '',
                subject: '',
                description: '',
            });
        } catch (err) {
            setError('Failed to submit the form');
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                {(error || loadError) && <p className={styles.error}>{error || loadError}</p>}
                <form className={styles.formGroup} onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <div className={styles.topElements}>
                            <div className={styles.element}>6-18 years</div>
                            <div className={styles.element}>online lessons</div>
                            <div className={styles.element}>a special approach</div>
                        </div>
                        <div className={styles.logo}>Veil School</div>
                    </div>
                    <div className={styles.flexContainer}>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your fullname"
                            className={styles.fullname}
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className={styles.email}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="phone_number"
                            placeholder="Phone Number"
                            className={styles.phone_number}
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Years"
                            className={styles.years}
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.flexContainer}>
                        <select name="teacher" value={formData.teacher} className={styles.teacher} onChange={handleChange} required>
                            <option value="" disabled>
                                Choose teacher
                            </option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.fullname}>
                                    {teacher.fullname}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className={styles.subject}
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        className={styles.description}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <button type="submit" className={styles.button}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Questionary;
