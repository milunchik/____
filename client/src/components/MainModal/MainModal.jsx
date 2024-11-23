import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './MainModal.module.css';
import { roleConstans } from '../../../assets/role-constants';
import { ROUTES } from '../../../assets/pages-routes';
import { CiLogout } from 'react-icons/ci';
import { RiProfileLine } from 'react-icons/ri';
import { MdDarkMode } from 'react-icons/md';
import { MdSunny } from 'react-icons/md';

const MainModal = ({ toggleModal, handleThemeChange, isDarkTheme }) => {
    const navigate = useNavigate();
    const { signout, user } = useAuth();
    const userRole = user?.role.toUpperCase();

    const handleLogout = () => {
        toggleModal();
        signout();
    };

    const handleProfileChange = () => {
        toggleModal();
        console.log('User Role:', userRole);

        const roleRoute = {
            [roleConstans.TEACHER]: ROUTES.TEACHER_PROFILE,
            [roleConstans.USER]: ROUTES.USER_PROFILE,
            [roleConstans.ADMIN]: ROUTES.ADMIN,
        };
        const route = roleRoute[userRole];
        console.log(route);
        navigate(route);
    };

    return (
        <div className={styles.modal} onClick={toggleModal}>
            <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
                <span className={styles.close} onClick={toggleModal}>
                    &times;
                </span>
                <ul className={styles.modalList}>
                    <li className={styles.modalListItem}>
                        <button onClick={handleLogout} className={styles.modalLink}>
                            <div className={styles.imageContainerModal}>
                                <CiLogout />
                                <p>Log out</p>
                            </div>
                        </button>
                    </li>
                    <li className={styles.modalListItem}>
                        <button onClick={handleProfileChange} className={styles.modalLink} data-cy="change-profile">
                            <div className={styles.imageContainerModal}>
                                <RiProfileLine /> <p>Change</p>
                            </div>
                        </button>
                    </li>
                    <li className={styles.modalListItem}>
                        <button onClick={handleThemeChange} className={styles.modalLink}>
                            <div className={styles.imageContainerModal}>
                                {isDarkTheme ? <MdDarkMode /> : <MdSunny />}
                                <p> {isDarkTheme ? 'Dark' : 'Light'}</p>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

MainModal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
};

export default MainModal;
