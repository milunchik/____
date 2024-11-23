import React, { useEffect, useState } from 'react';
import styles from './TeacherCard.module.css';
import { useNavigate } from 'react-router-dom';
import imageDefault from '../../../public/images/editImage.png';

const TeacherCard = ({ id, name, description, lessons, image }) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setImageUrl(`http://localhost:3000/${id}/image`);
    });

    const handleCardClick = () => {
        navigate(`/profile/${id}`);
    };

    return (
        <div className={styles.teacherCard} onClick={handleCardClick}>
            <div className={styles.teacherImage}>
                <img src={imageUrl || imageDefault} alt="teacher-image" />
            </div>
            <div className={styles.teacherInfo}>
                <div className={styles.teacherHeader}>
                    <img src="../images/circle.png" alt="circle" className={styles.circle} />
                    <h2>{name}</h2>
                </div>
                <p>{description}</p>
                <p>{lessons}</p>
            </div>
        </div>
    );
};

export default TeacherCard;
