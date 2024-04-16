// import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "@app_contexts/authContext.tsx";
import { Provider } from "react-redux";
import store from "@app_redux/store.ts";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthContextProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </AuthContextProvider>
  </Provider>
  // </React.StrictMode>
);