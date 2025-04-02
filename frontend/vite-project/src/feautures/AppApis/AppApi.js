import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../AppSlice";

const USER_API = `http://localhost:3000/api/user/`;
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
            dispatch(userLoggedIn({ user: data.userDetail }));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getProfile: builder.query({
      query: () => ({
        url: "getprofile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.userDetail) {
            dispatch(userLoggedIn({ user: data.userDetail }));
          }
        } catch (error) {
          console.log(error);
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
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getBuyCourse: builder.query({
      query: () => ({
        url: `/getbuycourse`,
        method: "GET",
      }),
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
