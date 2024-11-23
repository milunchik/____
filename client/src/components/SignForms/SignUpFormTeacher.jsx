import React from 'react';
import AuthForm from './AuthForm';
import { ROUTES } from '../../../assets/pages-routes';

const SignUpTeacherForm = () => {
const SignUpTeacherForm = () => {
    return (
        <AuthForm
            title="Create an Account"
            buttonText="Sign up as Teacher"
            linkText="Sign up like a student!"
            linkUrl={ROUTES.SIGNUP_USER}
            linkText2="Have an account? Sign in"
            linkUrl2={ROUTES.SIGNIN}
        />
    );
};
};

export default SignUpTeacherForm;
