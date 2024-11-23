import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import imageDefault from '../../../public/images/editImage.png';

const Card = ({ imgPath, name, role, phone, onDelete }) => {
    const [imageUrl, setImageUrl] = useState(imageDefault);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (imgPath && imgPath !== '') {
            setImageUrl(imgPath);
        } else {
            setImageUrl(imageDefault);
        }
    }, [imgPath]);

    return (
        <div className={styles.card}>
            <div className={styles.imageSection}>
                {error ? (
                    <p>Error loading image</p>
                ) : (
                    <img src={imageUrl} alt={`Image of ${name}`} height="200" width="200" />
                )}
            </div>
            <div className={styles.userData}>
                <h1 className={styles.name}>{name}</h1>
                <h2 className={styles.role}>{role}</h2>
                <p className={styles.phone}>{phone}</p>
            </div>
            <button onClick={onDelete} className={styles.deleteButton}>
                <img src="../images/delete.png" alt="delete" />
            </button>
        </div>
    );
};

Card.propTypes = {
    imgPath: PropTypes.string,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Card;
