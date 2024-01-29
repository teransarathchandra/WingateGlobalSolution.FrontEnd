import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from "./routes/routes";
import { ThemeProvider } from "./contexts/themeContext";

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        {/* <Route element={<PrivateRoute userData={userData} />}> */}
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        {/* </Route> */}

          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
