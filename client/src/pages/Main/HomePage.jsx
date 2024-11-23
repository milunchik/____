import React from 'react';

import Questionary from '../../components/Questionary/Questionary';
import TextMain from '../../components/TextMain/TextMain';
import styles from './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../assets/pages-routes';

const HomePage = () => {
    const navigate = useNavigate();

    const handleTeacher = () => {
        navigate(ROUTES.CATEGORIES);
    };

    return (
        <div className={styles.homeSection} data-cy="main-page">
            <section className={styles.main} data-cy="main-container">
                <div className={styles.imageContainer}>
                    <img src="../images/boys-main.png" alt="Illustration" className={styles.image} />
                    <div className={styles.textOverlay}>
                        <h1>Grow your 196+ communication skills with us</h1>
                        <br />
                        <p>
                            Providing the best material with passion, we create the core essence of brands though
                            stories & sings
                        </p>
                        <br />
                        <br />
                        <button className={styles.findTeacherBtn} onClick={handleTeacher}>
                            Find Teacher
                        </button>
                    </div>
                </div>
            </section>
            <TextMain />
            <div className={styles.flexContainer}>
                <Questionary />
                <img src="../images/children-main.png" alt="children" className={styles.imageForm} />
            </div>
        </div>
    );
};

export default HomePage;
