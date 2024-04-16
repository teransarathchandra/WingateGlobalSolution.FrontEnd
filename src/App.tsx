import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "./contexts/themeContext";
import CommonLoading from "./components/loader/CommonLoading";
import { Toaster } from "react-hot-toast";
import SideNav from "./components/dashboard/sideNav/SideNav";
import { Suspense, useEffect } from "react";
import ProtectedRoute from "@app_routes/ProtectedRoute";
import { loginSuccess } from "@app_redux/actions/authActions";
import { useAuthContext } from "@app_contexts/authContext";
import UserDrawer from "@app_components/shared/UserDrawer";
import { UserDrawerContainer } from "@app_styles/shared/userDrawer.styles";

const App = () => {

  const dispatch = useDispatch();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [dispatch, user]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <CommonLoading loading={false} />
        <Toaster position="top-right" />
        <SideNav />
        <UserDrawerContainer>
          <UserDrawer isVisible={user} />
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
                    <ProtectedRoute>{routeElement}</ProtectedRoute>
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
