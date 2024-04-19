import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import IRootState from "@app_interfaces/IRootState";
import toastUtil from "@app_utils/toastUtil";
// import { useAuth } from '@app_contexts/authContext';
import { useEffect } from "react";
// import CommonLoading from '@app_components/loader/CommonLoading';
import { useAuthContext } from "@app_contexts/authContext";
import { useEmpAuthContext } from "@app_contexts/employee/empAuthContext";

const ProtectedRoute = ({ isEmployeRoute, children }) => {
  const { user, token } = useAuthContext();
  const { employee, employeeToken } = useEmpAuthContext();

  const location = useLocation();

  useEffect(() => {
    console.log("Test", employee, user, isEmployeRoute);
    if (isEmployeRoute) {
      console.log("Test employee route");
      if (!employee) {
        toastUtil.error("Please login before accessing this page.");
      }
    } else {
      console.log("Test user route");
      if (!user || !token) {
        toastUtil.error("You are not logged in. Please log in to continue.");
      }
    }
  }, [user, token, employee, employeeToken, location]);

  if (isEmployeRoute) {
    return employee && employeeToken ? (
      children
    ) : (
      <Navigate to="/emp-checkpoint" replace />
    );
  } else {
    return user && token ? children : <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
