import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./redux/store"; // import your store
import { ThemeProvider } from "./contexts/themeContext";
import CommonLoading from "./components/loader/CommonLoading";
import { Toaster } from "react-hot-toast";
import SideNav from "./components/dashboard/sideNav/SideNav";
import { Suspense, useState } from "react";
import React from "react";
import SideDrawer from "./components/shared/SideDrawer";

const App: React.FC = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'Choose Destination',
    'Shipment',
    'Required Documents',
    'Delivery Options',
    'Place Order',
    'Confirm Payment',
    'Status',
  ];

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CommonLoading loading={false} />
          <Toaster position="top-right" />
          <SideNav />
          <SideDrawer steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
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
