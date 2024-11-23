import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../assets/pages-routes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('session');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedUser = sessionStorage.getItem('session');
        return !!storedUser;
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signin = async (email, password) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                setIsAuthenticated(true);
                sessionStorage.setItem(
                    'session',
                    JSON.stringify({ id: data._id, role: data.role, fullname: data.fullname }),
                );
                navigate(ROUTES.HOME);
            } else {
                navigate(ROUTES.NOT_FOUND);
            }
        } catch (error) {
            console.error('Error during signin:', error);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email, password, url) => {
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                setIsAuthenticated(true);
                navigate(ROUTES.SIGNIN);
            } else {
                navigate(ROUTES.NOT_FOUND);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        } finally {
            setLoading(false);
        }
    };

    const signout = async () => {
        try {
            const response = await fetch('http://localhost:3000/signout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                setUser(null);
                setIsAuthenticated(false);
                sessionStorage.removeItem('session');
                navigate(ROUTES.HOME);
            }
        } catch (err) {
            console.log('Error during signout:', err);
        }
    };

    const signupUser = (email, password) => signup(email, password, 'http://localhost:3000/signupuser');
    const signupTeacher = (email, password) => signup(email, password, 'http://localhost:3000/signupteacher');

    const reset = async (email) => {
        try {
            const res = await fetch('http://localhost:3000/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                alert('Check your emails for resetting password');
            } else {
                alert('Failed to send reset email');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
        }
    };

    const resetToken = async (resetToken, password) => {
        try {
            const res = await fetch(`http://localhost:3000/reset/${resetToken}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                alert('Password has been changed');
            } else {
                alert('Failed to reset password');
            }
        } catch (error) {
            console.error('Error during password reset token:', error);
        }
    };

    return {
        user,
        isAuthenticated,
        loading,
        signin,
        signupUser,
        signupTeacher,
        signout,
        reset,
        resetToken,
    };
};
