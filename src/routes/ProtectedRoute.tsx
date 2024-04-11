import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import IRootState from "@app_interfaces/IRootState";
import toastUtil from '@app_utils/toastUtil';
// import { useAuth } from '@app_contexts/authContext';
import { useEffect } from 'react';
// import CommonLoading from '@app_components/loader/CommonLoading';
import { useAuthContext } from '@app_contexts/authContext';

const ProtectedRoute = ({ children }) => {
    const { user, token } = useAuthContext();
    const location = useLocation();

    useEffect(() => {
        if (!user || !token) {
            toastUtil.error('You are not logged in. Please log in to continue.');
        }
    }, [user, token, location]);

    return user && token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;