import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Aggressively unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister().then((success) => {
        if (success) {
          console.log('Service worker desregistrado com sucesso');
        }
      });
    });
  });
  
  // Also try to unregister using the ready property
  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister();
  });
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
