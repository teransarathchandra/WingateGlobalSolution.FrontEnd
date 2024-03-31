import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IRootState from "@app_interfaces/IRootState";
import toastUtil from '@app_utils/toastUtil';

const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state: IRootState) => state.auth);
    if (!auth.user) {
        setTimeout(() => toastUtil.error('You are not logged in. Please log in to continue.'), 500);
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;