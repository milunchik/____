import React, { useState } from 'react';
import styles from './Reset.module.css';
import { useAuth } from '../../context/AuthContext';

const Reset = () => {
    const { reset } = useAuth();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await reset(email);
            alert('Check your email to reset your password');
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('An error occurred while resetting the password');
        }
    };

    return (
        <div className={styles.reset} data-cy="reset-form-section">
            <form onSubmit={handleSubmit}>
                <p>Enter your email for resetting password:</p>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Reset</button>
            </form>
        </div>
    );
};

export default Reset;
