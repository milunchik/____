import React, { createContext, useContext, useState, useEffect } from 'react';

const QuestionaryContext = createContext();

export const QuestionaryProvider = ({ children }) => {
    const questionaryActions = useProvideQuestionary();
    return <QuestionaryContext.Provider value={questionaryActions}>{children}</QuestionaryContext.Provider>;
};

export const useQuestionary = () => {
    return useContext(QuestionaryContext);
};

const useProvideQuestionary = () => {
    const [error, setError] = useState('');

    const createQuestionaries = async (email, fullname, phone_number, age, teacher, subject, description) => {
        try {
            const response = await fetch('http://localhost:3000/questionary/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, fullname, phone_number, age, teacher, subject, description }),
            });

            if (!response.ok) throw new Error('Failed to send questionnaire');

            alert('The questionaire has been sent to the teacher. Wait for the answer');
        } catch (err) {
            setError('Could not send questionnaire');
        }
    };

    return {
        createQuestionaries,
        error,
    };
};
