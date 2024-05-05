import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import IRootState from "@app_interfaces/IRootState";
import toastUtil from "@app_utils/toastUtil";
// import { useAuth } from '@app_contexts/authContext';
import { useEffect, useState } from "react";
// import CommonLoading from '@app_components/loader/CommonLoading';
import { useUserAuthContext } from "@app_contexts/childContexts/authUserContext";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import { useActiveAuthContext } from "@app_contexts/authActiveContext";
import { useAppNavigation } from "@app_utils/appNavigation";
import { IRoute } from "@app_interfaces/IRoute"
import { useNavigate } from 'react-router-dom';

interface IRouteX {
  route: IRoute;
  children: any;
}

const ProtectedRoute = ({ route, children }: IRouteX) => {
  const { setActiveUser, setActiveToken, setActiveRefreshToken } =
    useActiveAuthContext();

  const { user, userToken, userRefreshToken } = useUserAuthContext();
  const { employee,
    employeeToken,
    employeeRefreshToken } = useEmployeeAuthContext();

  const { shouldContinueAppNavigation } = useAppNavigation();
  const [isAllowed, setIsAllowed] = useState(false);
  const [checkPageAccess, setCheckPageAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (route.forEmployeeOnly && employee && employeeToken && isAllowed == false) {

        await shouldContinueAppNavigation(route.path, employeeToken).then(resp => {
          console.log("resp:", resp);
          setIsAllowed(true);
        });

      }


    };

    checkAccess();

    if (route.isPrivate) {
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

    return () => {
      setIsAllowed(false);
    };
  }, [user, userToken, employee, employeeToken, checkPageAccess]);

  console.log("protected route access: ", route.isPrivate);

  if (route.forEmployeeOnly) {
    if (employee && employeeToken) {
      console.log("route access", route.path, " allowed: ", isAllowed);
      if (isAllowed) {
        return children
      } else {

        return <Navigate to="/app/portal-welcome" replace />
      }
    } else {
      return <Navigate to="/emp-checkpoint" replace />
    }
  } else {
    return user && userToken ? children : <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
