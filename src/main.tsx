import { createRoot } from 'react-dom/client';
import App from "./App.tsx";
import "./styles/globals.css";

if (typeof window !== "undefined") {
  const sendToParent = (data: any) => {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(data, window.location.origin);
      }
    } catch {}
  };

  window.addEventListener("error", (event) => {
    // Send structured payload to parent iframe
    sendToParent({
      type: "ERROR_CAPTURED",
      error: {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        source: "window.onerror",
      },
      timestamp: Date.now(),
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason: any = event.reason;
    const message =
      typeof reason === "object" && reason?.message
        ? String(reason.message)
        : String(reason);
    // Mirror to parent iframe as well
    sendToParent({
      type: "ERROR_CAPTURED",
      error: {
        message,
        filename: undefined,
        lineno: undefined,
        colno: undefined,
        source: "unhandledrejection",
      },
      timestamp: Date.now(),
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);