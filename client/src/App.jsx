import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Admin from './pages/Admin/AdminPage';
import Categories from './pages/Categories/Categories';
import EditTeacherProfile from './pages/EditTeacherProfile/EditTeacherProfile';
import EditUserProfile from './pages/EditUserProfile/EditUserProfile';
import FindTeacher from './pages/FindTeacher/FindTeacherPage';
import HomePage from './pages/Main/HomePage';
import SignIn from './pages/SignPages/SignIn';
import SignUpTeacher from './pages/SignPages/SignUpTeacher';
import SignUpUser from './pages/SignPages/SignUpUser';
import ViewUserPage from './pages/ViewUser/ViewUserPage';
import MainModal from './components/MainModal/MainModal';
import Reset from './components/Reset/ResetForm';
import NotFound from './components/NotFound/NotFound';

import { roleConstans } from '../assets/role-constants';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/userContext';
import { QuestionaryProvider } from './context/questionaryContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { ROUTES } from '../assets/pages-routes';

function App() {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        if (isModalOpen) {
            setIsModalOpen(false);
        }
    }, [location.pathname]);

    const hideHeaderPaths = [ROUTES.SIGNIN, ROUTES.SIGNUP_TEACHER, ROUTES.SIGNUP_USER];
    const showHeader = !hideHeaderPaths.includes(location.pathname);
    const showFooter = !hideHeaderPaths.includes(location.pathname);

    return (
        <AuthProvider>
            <UserProvider>
                <QuestionaryProvider>
                    {showHeader && <Header />}
                    <Routes>
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
                        <Route path={ROUTES.SIGNUP_USER} element={<SignUpUser />} />
                        <Route path={ROUTES.SIGNUP_TEACHER} element={<SignUpTeacher />} />
                        <Route path={ROUTES.RESET} element={<Reset />} />
                        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />

                        
                        <Route path={ROUTES.CATEGORIES} element={<ProtectedRoute element={<Categories />} />} />
                        <Route path={ROUTES.PROFILE} element={<ProtectedRoute element={<ViewUserPage />} />} />
                        <Route
                            path={ROUTES.ADMIN}
                            element={<ProtectedRoute element={<Admin />} allowedRoles={[roleConstans.ADMIN]} />}
                        />
                        <Route
                            path={ROUTES.TEACHER_PROFILE}
                            element={
                                <ProtectedRoute
                                    element={<EditTeacherProfile />}
                                    allowedRoles={[roleConstans.TEACHER]}
                                />
                            }
                        />
                        <Route path={ROUTES.PROFILE} element={<ProtectedRoute element={<ViewUserPage />} />} />
                        <Route
                            path={ROUTES.USER_PROFILE}
                            element={
                                <ProtectedRoute element={<EditUserProfile />} allowedRoles={[roleConstans.USER]} />
                            }
                        />

                        <Route path={ROUTES.FIND_TEACHER} element={<ProtectedRoute element={<FindTeacher />} />} />
                    </Routes>
                    {isModalOpen && <MainModal toggleModal={toggleModal} />}
                    {showFooter && <Footer />}
                </QuestionaryProvider>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
