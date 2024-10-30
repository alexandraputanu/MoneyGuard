import { Navigate, Route, Routes } from 'react-router-dom';
import { refreshThunk } from './redux/Auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';

import useMedia from './hooks/useMedia';
import './App.css';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import clsx from 'clsx';
import { selectIsAddModalOpen, selectIsEditModalOpen } from './redux/Modals/slice';
import { selectIsLoggedIn } from './redux/Auth/selectors';

const Home = lazy(() => import('./components/Home/Home'));
const Statistics = lazy(() => import('./components/Statistics/Statistics'));
const Balance = lazy(() => import('./components/Balance/Balance'));
const Currency = lazy(() => import('./components/Currency/Currency'));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshThunk());
    }, [dispatch]);

    const isAuthenticated = useSelector(selectIsLoggedIn);
    const { isMobile } = useMedia();
    const isEditOpen = useSelector(selectIsAddModalOpen);
    const isAddOpen = useSelector(selectIsEditModalOpen);

    return (
        <div className={clsx('app', isEditOpen || (isAddOpen && 'block-scroll'))}>
            <Routes>
                {/* Redirecționare către Login/Dashboard în funcție de autentificare */}
                {isAuthenticated ? <Route path="/" element={<Navigate to="/dashboard" replace />} /> : <Route path="/" element={<Navigate to="/login" replace />} />}

                {/* Rute Publice  */}
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <PublicRoute>
                            <RegistrationPage />
                        </PublicRoute>
                    }
                />

                {/* Rute Private */}
                <Route
                    path="dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                >
                    <Route
                        index
                        element={
                            isMobile ? (
                                <>
                                    <Balance />
                                    <Home />
                                </>
                            ) : (
                                <Home />
                            )
                        }
                    />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="currency" element={isMobile ? <Currency /> : <Navigate to="/dashboard" />} />
                </Route>

                {/* Redirecționare wildcard */}
                <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
            </Routes>
        </div>
    );
}

export default App;
