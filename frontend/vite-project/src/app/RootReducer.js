import { combineReducers } from "@reduxjs/toolkit";
import AppReducer from "../feautures/AppSlice";
import { AppApi } from "@/feautures/AppApis/AppApi";
import { CourceApi } from "@/feautures/AppApis/CourceApi";
import { TransactionApi } from "@/feautures/AppApis/TransactionApi";

const RootReducer = combineReducers({
  [AppApi.reducerPath]: AppApi.reducer,
  [CourceApi.reducerPath]: CourceApi.reducer,
  [TransactionApi.reducerPath]: TransactionApi.reducer,
  userSlice: AppReducer,
});
export default RootReducer;
