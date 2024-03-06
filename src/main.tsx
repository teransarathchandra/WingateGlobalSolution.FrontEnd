// import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
      <App />
  </GoogleOAuthProvider>
  // </React.StrictMode>
);