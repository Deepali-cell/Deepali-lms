import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./context/StateContext";
import { Provider } from "react-redux";
import { Store } from "./app/Store";
import { Toaster } from "@/components/ui/sonner";
import store from "./app/Store";
import { userLoggedIn } from "./feautures/AppSlice";

// ✅ Put this code here before React renders
const savedUser = localStorage.getItem("user");
if (savedUser) {
  store.dispatch(userLoggedIn({ user: JSON.parse(savedUser) }));
}

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
