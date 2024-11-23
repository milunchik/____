import React from 'react';

import styles from './TextMain.module.css';

function TextMain() {
    return (
        <div className={styles.TextContainer} data-cy="text-for-main-page">
            <div className={styles.featuresContainer}>
                <div className={styles.featureBox}>
                    <h1 className={styles.whySchool}>Why our school?</h1>
                    <p>Our school only has the best specialists who are constantly improving their knowledge.</p>
                    <br />
                    <p>Let`s study together!</p>
                </div>
                <div className={styles.featureBoxPurple}>
                    <img src="../images/expert-teacher.png" alt="expert-teacher" className={styles.icon} />
                    <h1>Expert Teacher</h1>
                    <p>Connecting people who want to earn knowledge with great teachers</p>
                </div>
                <div className={styles.featureBox}>
                    <img src="../images/courses.png" alt="online-courses" className={styles.icon} />
                    <h1>Online Courses</h1>
                    <p>The place where you can find a lot of useful information and learn new things</p>
                </div>
                <div className={styles.featureBoxPurple}>
                    <img src="../images/reg.png" alt="easy-registration" className={styles.icon} />
                    <h1>Easy Registration</h1>
                    <p>To find a tutor, you only need two clicks</p>
                </div>
            </div>
        </div>
    );
}

export default TextMain;
