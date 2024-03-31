import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store"; // import your store
import { ThemeProvider } from "./contexts/themeContext";
import CommonLoading from "./components/loader/CommonLoading";
import { Toaster } from "react-hot-toast";
import SideNav from "./components/dashboard/sideNav/SideNav";
import { Suspense } from "react";
import ProtectedRoute from "@app_routes/ProtectedRoute";

const App = () => {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CommonLoading loading={false} />
          <Toaster position="top-right" />
          <SideNav />
          <Routes>
            {publicRoutes.concat(privateRoutes).map((route, index) => {
              const Component = route.component; // Name component with capital C as per React convention
              const routeElement = (
                <Suspense fallback={<CommonLoading loading={true} />}>
                  <Component />
                </Suspense>
              );
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.isPrivate ? <ProtectedRoute>{routeElement}</ProtectedRoute> : routeElement}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
