// import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";
import { AuthActiveContextProvider } from "@app_contexts/authActiveContext.tsx";
import { AuthUserContextProvider } from "@app_contexts/childContexts/authUserContext.tsx";
import { AuthEmployeeContextProvider } from "@app_contexts/childContexts/authEmployeeContext.tsx";
import { Provider } from "react-redux";
import store from "@app_redux/store.ts";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthActiveContextProvider>
      <AuthEmployeeContextProvider>
        <AuthUserContextProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </AuthUserContextProvider>
      </AuthEmployeeContextProvider>
    </AuthActiveContextProvider>
  </Provider>
  // </React.StrictMode>
);
