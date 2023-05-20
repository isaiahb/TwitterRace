import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import { clarity } from 'react-microsoft-clarity';

clarity.init('h6njp07cdk');
console.log("Clarity initialized");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
);
