import React from 'react';
import AuthForm from './AuthForm';
import { ROUTES } from '../../../assets/pages-routes';

const SignUpFormUser = () => {
const SignUpFormUser = () => {
    return (
        <AuthForm
            title="Create an Account"
            buttonText="Sign up as User"
            linkText="Sign up like a teacher!"
            linkUrl={ROUTES.SIGNUP_TEACHER}
            linkText2="Have an account? Sign in"
            linkUrl2={ROUTES.SIGNIN}
        />
    );
};
};

export default SignUpFormUser;
