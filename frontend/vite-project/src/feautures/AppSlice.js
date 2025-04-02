import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthticated: false,
};

const AppSlice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthticated = true;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthticated = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = AppSlice.actions;
export default AppSlice.reducer;
