import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store"; // import your store
import { ThemeProvider } from "./contexts/themeContext";
import CommonLoading from "./components/loader/CommonLoading";
import { Toaster } from "react-hot-toast";
import SideNav from "./components/dashboard/sideNav/SideNav";
import { Suspense } from "react";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CommonLoading loading={false} />
          <Toaster position="top-right" />
          <SideNav />
          <Suspense fallback={<CommonLoading loading={true} />}>
            <Routes>
              {privateRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={`/app/${route.path}`}
                  element={route.element}
                />
              ))}

              {publicRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
