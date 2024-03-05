import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store"; // import your store
import { ThemeProvider } from "./contexts/themeContext";
import CommonLoading from "./components/loader/CommonLoading";
import { Toaster } from "react-hot-toast";
import SideNav from "./components/dashboard/sideNav/SideNav";
import { Suspense } from "react";
import React from "react";

const App = () => {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CommonLoading loading={false} />
          <Toaster position="top-right" />
          <SideNav />
          <Routes>
            {privateRoutes.concat(publicRoutes).map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<CommonLoading loading={true} />}>
                    {React.createElement(route.component)}
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
