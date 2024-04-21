import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import IRootState from "@app_interfaces/IRootState";
import toastUtil from "@app_utils/toastUtil";
// import { useAuth } from '@app_contexts/authContext';
import { useEffect } from "react";
// import CommonLoading from '@app_components/loader/CommonLoading';
import { useUserAuthContext } from "@app_contexts/childContexts/authUserContext";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import { useActiveAuthContext } from "@app_contexts/authActiveContext";

const ProtectedRoute = ({ isEmployeeRoute, children }) => {
  const { setActiveUser, setActiveToken, setActiveRefreshToken } =
    useActiveAuthContext();

  const { user, userToken, userRefreshToken } = useUserAuthContext();
  const { employee, employeeToken, employeeRefreshToken } =
    useEmployeeAuthContext();

  const location = useLocation();

  useEffect(() => {
    if (isEmployeeRoute) {
      console.log("route access: employee");
      if (!employee || !employeeToken) {
        toastUtil.error("Please login before accessing this page.");
      } else {
        setActiveUser(employee);
        setActiveToken(employeeToken);
        setActiveRefreshToken(employeeRefreshToken);
      }
    } else {
      console.log("route access: user");
      if (!user || !userToken) {
        toastUtil.error("You are not logged in. Please log in to continue.");
      } else {
        setActiveUser(user);
        setActiveToken(userToken);
        setActiveRefreshToken(userRefreshToken);
      }
    }
  }, [user, userToken, employee, employeeToken, location]);

  if (isEmployeeRoute) {
    return employee && employeeToken ? (
      children
    ) : (
      <Navigate to="/emp-checkpoint" replace />
    );
  } else {
    return user && userToken ? children : <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
