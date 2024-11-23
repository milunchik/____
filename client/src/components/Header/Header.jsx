import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainModal from '../MainModal/MainModal';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import { ROUTES } from '../../../assets/pages-routes';
import { IoMdSettings } from 'react-icons/io';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated, signout } = useAuth();
    const userId = JSON.parse(sessionStorage.getItem('session'))?.id;
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.style.setProperty('--secondary-color', '#ffffff');
            document.documentElement.style.setProperty('--background-color', '#eaeaea');
        } else {
            document.documentElement.style.setProperty('--secondary-color', '#eaeaea');
            document.documentElement.style.setProperty('--background-color', '#553A59');
        }
    }, [isDarkTheme]);

    useEffect(() => {
        setIsModalOpen(false);
    }, [location]);

    const handleThemeChange = () => {
        setIsDarkTheme((prevTheme) => {
            const newTheme = !prevTheme;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
        toggleModal();
    };

    return (
        <header data-cy="header">
            <div className={styles.wrapper}>
                <div className={styles.illustrationSection}>
                    <div className={styles.logoWrapper}>
                        <img src={`../images/VEIL_logo.png`} alt="Logo" className={styles.logo} />
                        <span className={styles.logoText}>eil {'|'} </span>
                        <Link to={ROUTES.HOME} className={styles.homeLink} style={{ color: 'var(--primary-color)' }}>
                            HOME
                        </Link>
                    </div>
                </div>
                <nav className={styles.nav}>
                    <Link to={ROUTES.CATEGORIES} data-cy="categories-link">
                        Categories
                    </Link>
                    {user ? (
                        <>
                            <Link to={`/profile/${userId}`} data-cy="profile-link">
                                Profile
                            </Link>
                        </>
                    ) : (
                        <Link to={ROUTES.SIGNIN} data-cy="login-link">
                            Login
                        </Link>
                    )}
                    <button className={styles.settings} onClick={toggleModal} data-cy="settings-button">
                        <IoMdSettings style={{ color: '#ba68c8', fontSize: '2em' }} />
                    </button>
                </nav>
                {isModalOpen && (
                    <MainModal
                        toggleModal={toggleModal}
                        handleThemeChange={handleThemeChange}
                        isDarkTheme={isDarkTheme}
                        data-cy="main-modal"
                    />
                )}
            </div>
        </header>
    );
}

export default Header;
