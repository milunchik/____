import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Categories.css';
import { subjects } from '../../../assets/subjects-constants';
import { ROUTES } from '../../../assets/pages-routes';

const Categories = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCategorySelect = (name) => {
        if (name) {
            console.log('Selected category ID:', name);
            navigate(ROUTES.FIND_TEACHER, { state: { selectedCategory: name } });
        } else {
            setError('Invalid category selected.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContent}>
                <div className={styles.left}>
                    <img className={styles.descriptionImg} src="/images/description.png" alt="description" />
                    <button className={styles.consultationBtn}>
                        <article className="contact__option">
                            <a
                                href="https://t.me/millunchik"
                                target="__blank"
                                rel="noopener noreferrer"
                                className="btn"
                            >
                                Get a consultation
                            </a>
                        </article>
                    </button>
                </div>
                <div className={styles.right}>
                    <div className={styles.subjectContainer}>
                        {subjects.map((subject) => (
                            <div
                                className={styles.subject}
                                key={subject.id}
                                onClick={() => handleCategorySelect(subject.name)}
                                style={{ cursor: 'pointer' }}
                                data-cy="subject-item"
                            >
                                <span style={{ backgroundColor: subject.color }}>
                                    {subject.id.toString().padStart(2, '0')}
                                </span>
                                <p>{subject.name}</p>
                            </div>
                        ))}
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Categories;
