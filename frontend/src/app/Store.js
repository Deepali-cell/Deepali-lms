import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";
import { AppApi } from "@/feautures/AppApis/AppApi";
import { userLoggedIn } from "../feautures/AppSlice";
import { CourceApi } from "@/feautures/AppApis/CourceApi";
import { TransactionApi } from "@/feautures/AppApis/TransactionApi";

export const Store = configureStore({
  reducer: RootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      AppApi.middleware,
      CourceApi.middleware,
      TransactionApi.middleware
    ),
});

const initializeApp = async () => {
  const dispatch = Store.dispatch;

  try {
    const response = await dispatch(
      AppApi.endpoints.getProfile.initiate({}, { forceRefetch: true })
    );
    if (response.data) {
      dispatch(userLoggedIn({ user: response.data.user }));
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

initializeApp();
