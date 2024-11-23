import React from 'react';

import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.illustrationSection} data-cy="logo-title">
            <h1>
                <img src="../images/VEIL_logo.png" alt="Illustration" id="logo" className={styles.logo} />
                eil
            </h1>
        </div>
    );
};

export default Logo;
