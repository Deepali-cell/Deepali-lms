import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../AppSlice";

const USER_API = `${import.meta.env.VITE_BACKEND_URL}/user/`;

export const AppApi = createApi({
  reducerPath: "AppApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.userDetail) {
            // Save to Redux + LocalStorage
            dispatch(userLoggedIn({ user: data.userDetail }));
            localStorage.setItem("user", JSON.stringify(data.userDetail));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.userDetail) {
            // Save to Redux + LocalStorage
            dispatch(userLoggedIn({ user: data.userDetail }));
            localStorage.setItem("user", JSON.stringify(data.userDetail));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    getProfile: builder.query({
      query: () => ({ url: "getprofile", method: "GET" }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.userDetail) {
            dispatch(userLoggedIn({ user: data.userDetail }));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "editprofile",
        method: "POST",
        body: formData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({ url: "logout", method: "GET" }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
          localStorage.removeItem("user");
        } catch (err) {
          console.error(err);
        }
      },
    }),

    getBuyCourse: builder.query({
      query: () => ({ url: "getbuycourse", method: "GET" }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutUserMutation,
  useGetBuyCourseQuery,
} = AppApi;
