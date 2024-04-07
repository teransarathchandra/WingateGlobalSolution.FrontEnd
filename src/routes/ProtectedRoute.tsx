import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import IRootState from "@app_interfaces/IRootState";
import toastUtil from '@app_utils/toastUtil';
// import { useAuth } from '@app_contexts/authContext';
import { useEffect } from 'react';
// import CommonLoading from '@app_components/loader/CommonLoading';
import { useAuthContext } from '@app_contexts/authContext';

const ProtectedRoute = ({ children }) => {
    // debugger;
    const { user, token } = useAuthContext();
    const location = useLocation();

    useEffect(() => {
        if (!user || !token) {
            toastUtil.error('You are not logged in. Please log in to continue.');
        }
    }, [user, token, location]);

    // if (!isInitialized) {
    //     return <CommonLoading loading={!isInitialized} />; // Using a standardized Loader component for consistency
    // }

    return user && token ? children : <Navigate to="/" replace />;
};

// const ProtectedRoute = ({ children }) => {
//     const { user, isInitialized } = useAuth();
//     debugger;
//     if (!isInitialized) {
//         return <div>Loading...</div>; // Or your loading component
//     }
//     if (!user) {
//         // Delay the toast to ensure it's shown after the navigation
//         setTimeout(() => toastUtil.error('You are not logged in. Please log in to continue.'), 100);
//         return <Navigate to="/" replace />;
//     }

//     return children;
//     // if (!auth.user) {
//     //     setTimeout(() => toastUtil.error('You are not logged in. Please log in to continue.'), 100);
//     //     return <Navigate to="/" replace />;
//     // }
//     // return auth.user ? children : null;
// };

export default ProtectedRoute;