import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "./contexts/themeContext";
import CommonLoading from "./components/loader/CommonLoading";
import { Toaster } from "react-hot-toast";
import SideNav from "./components/dashboard/sideNav/SideNav";
import { Suspense, useEffect } from "react";
import ProtectedRoute from "@app_routes/ProtectedRoute";
import {
  loginSuccess,
  employeeLoginSuccess,
} from "@app_redux/actions/authActions";
import { useUserAuthContext } from "@app_contexts/childContexts/authUserContext";
import { useEmployeeAuthContext } from "@app_contexts/childContexts/authEmployeeContext";
import UserDrawer from "@app_components/shared/UserDrawer";
import { UserDrawerContainer } from "@app_styles/shared/userDrawer.styles";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useUserAuthContext();
  const { employee } = useEmployeeAuthContext();

  useEffect(() => {
    if (user) {
      dispatch(loginSuccess(user));
      console.log("dispatch: userLoginSuccess");
    }
    if (employee) {
      dispatch(employeeLoginSuccess(employee));
      console.log("dispatch: employeeLoginSuccess");
    }
  }, [dispatch, user, employee]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <CommonLoading loading={false} />
        <Toaster position="top-right" />
        <SideNav />
        <UserDrawerContainer>
          <UserDrawer isVisible={user || employee} />
        </UserDrawerContainer>
        <Routes>
          {publicRoutes.concat(privateRoutes).map((route) => {
            const Component = route.component; // Name component with capital C as per React convention
            const routeElement = (
              <Suspense fallback={<CommonLoading loading={true} />}>
                <Component />
              </Suspense>
            );
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.isPrivate ? (
                    <ProtectedRoute
                      isEmployeRoute={route.forEmployeeOnly}
                      children={routeElement}
                    ></ProtectedRoute>
                  ) : (
                    routeElement
                  )
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
