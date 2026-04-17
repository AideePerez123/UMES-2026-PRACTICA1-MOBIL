import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onOfflineReady() {
    console.log("La aplicación ya puede funcionar offline.");
  },
  onNeedRefresh() {
    console.log("Hay una nueva versión disponible.");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
