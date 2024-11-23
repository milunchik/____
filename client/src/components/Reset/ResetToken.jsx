import React, { useState } from 'react';
import styles from './Reset.module.css';
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../assets/pages-routes';

const ResetPassword = () => {
    const { resetToken } = useAuth();
    const [password, setPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetToken(token, password);
            alert('Password has been changed');
            navigate(ROUTES.SIGNIN);
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing the password');
        }
    };

    return (
        <div className={styles.reset} data-cy="reset-form-section">
            <form onSubmit={handleSubmit}>
                <p>Enter the new password to change:</p>
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
