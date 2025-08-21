import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./context/StateContext";
import { Provider } from "react-redux";
import { Store } from "./app/Store";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <StateProvider>
        <App />
        <Toaster />
      </StateProvider>
    </Provider>
  </StrictMode>
);
