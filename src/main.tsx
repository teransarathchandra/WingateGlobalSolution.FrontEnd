// import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";
import { StepProvider } from "./contexts/StepContext.tsx";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <StepProvider>
      <App />
    </StepProvider>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);