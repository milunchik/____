import React from 'react';

import Logo from '../../components/Logo/Logo';
import SignUpTeacherForm from '../../components/SignForms/SignUpFormTeacher';
import SignPicture from '../../components/SignPicture/Pic';
import styles from './SignUp.css';

const SignUpTeacher = () => {
    return (
        <div className={styles.signupPage} data-cy="signup-teacher-page">
            <div className={styles.containerPage} data-cy="signup-teacher-container">
                <div className={styles.signupLeft}>
                    <div className={styles.signupContainer}>
                        <Logo />
                        <SignUpTeacherForm />
                    </div>
                </div>
                <SignPicture />
            </div>
        </div>
    );
};

export default SignUpTeacher;
