import React from 'react';
import AuthForm from './AuthForm';
import { ROUTES } from '../../../assets/pages-routes';

const SignIn = () => {
const SignIn = () => {
    return (
        <AuthForm
            title="Enter to the Account"
            buttonText="Sign in"
            linkText="Don't have an account?"
            linkUrl={ROUTES.SIGNUP_USER}
            linkText2="Reset password"
            linkUrl2={ROUTES.RESET}
        />
    );
};
};

export default SignIn;
