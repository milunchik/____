import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

import styles from './SignUpForm.module.css';

const AuthForm = ({ title, buttonText, linkText, linkUrl, linkText2, linkUrl2 }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (buttonText === 'Sign in') {
            await auth.signin(email, password);
        } else if (buttonText === 'Sign up as User') {
            await auth.signupUser(email, password);
        } else if (buttonText === 'Sign up as Teacher') {
            await auth.signupTeacher(email, password);
        }
    };

    return (
        <div className={styles.signupWrap} data-cy="auth-form">
            <div className={styles.signupContainer}>
                <div className={styles.formSection}>
                    <h1>{title}</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            data-cy="email-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            data-cy="password-input"
                            required
                        />
                        <button type="submit" data-cy="submit-button">
                            {buttonText}
                        </button>
                    </form>
                    {linkText && (
                        <p>
                            {linkText}{' '}
                            <span className={styles.signinLink}>
                                <a href={linkUrl} data-cy="link-url">
                                    Sign up
                                </a>
                            </span>
                        </p>
                    )}
                    {linkText2 && (
                        <p>
                            <span className={styles.signinLink}>
                                <a href={linkUrl2}>{linkText2}</a>
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
