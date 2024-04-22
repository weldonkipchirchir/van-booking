import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./utils/auth";
import { Navigate } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider navigate={Navigate}>
        <App />
      </AuthProvider>
  </React.StrictMode>
);
