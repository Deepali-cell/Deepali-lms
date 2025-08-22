import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./context/StateContext";
import { Provider } from "react-redux";
import { userLoggedIn } from "./feautures/AppSlice";
import { Toaster } from "./components/ui/sonner";
import { Store } from "./app/Store";

// ✅ Put this code here before React renders
const { dispatch } = Store;
const savedUser = localStorage.getItem("user");
if (savedUser) {
  dispatch(userLoggedIn({ user: JSON.parse(savedUser) }));
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
