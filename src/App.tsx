import Navbar from "./components/shared/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store"; // import your store
import { ThemeProvider } from "./contexts/themeContext";
import CommonLoading from "./components/loader/CommonLoading"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <CommonLoading/>
      <ThemeProvider>
        <BrowserRouter>
        <Toaster position="top-right" />
          <Navbar />
          <Routes>
            {/* <Route element={<PrivateRoute userData={userData} />}> */}
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            {/* </Route> */}

            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
