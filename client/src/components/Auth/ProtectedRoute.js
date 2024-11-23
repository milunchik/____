import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../../assets/pages-routes';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { user, isAuthenticated } = useAuth();
    console.log(user);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.SIGNIN} />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role.toUpperCase())) {
        return <Navigate to={ROUTES.NOT_FOUND} />;
    }

    return element;
};

export default ProtectedRoute;
