import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Questionary from '../../components/Questionary/Questionary';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import styles from './FindTeacherPage.css';
import { useUser } from '../../context/userContext';
import imageDefault from '../../../public/images/editImage.png';

const FindTeacherPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedCategory = location.state?.selectedCategory;
    const { teachers, fetchTeachers, error } = useUser();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchTeachers(selectedCategory);
                setIsDataFetched(true);
            } catch (err) {
                console.error('Could not load data:', err);
            }
        };

        if (!isDataFetched) {
            fetchData();
        }
    }, [selectedCategory, isDataFetched, fetchTeachers]);

    const previousTeacher = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? teachers.length - 1 : prevIndex - 1));
    };

    const nextTeacher = () => {
        setCurrentIndex((prevIndex) => (prevIndex === teachers.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.teachersSection}>
                <div className={styles.teachersHeader}>
                    <h1>Our Teachers</h1>
                    <div className={styles.buttons}>
                        <button className={styles.prevButton} onClick={previousTeacher}>
                            &lt;
                        </button>
                        <button className={styles.nextButton} onClick={nextTeacher}>
                            &gt;
                        </button>
                    </div>
                </div>
                <div className={styles.carouselContent}>
                    {error && <p className={styles.error}>{error}</p>}
                    {teachers.length > 0 ? (
                        <TeacherCard
                            name={teachers[currentIndex]?.fullname || 'Unknown'}
                            description={teachers[currentIndex]?.description || 'No description'}
                            lessons={teachers[currentIndex]?.lessons || 'No lessons'}
                            id={teachers[currentIndex]?._id || 'N/A'}
                        />
                    ) : (
                        <p>No teachers available for this category.</p>
                    )}
                </div>
            </div>
            <div className={styles.flexContainer}>
                <Questionary />
                <img src="../images/children-main.png" alt="children" className={styles.imageForm} />
            </div>
        </div>
    );
};

export default FindTeacherPage;
