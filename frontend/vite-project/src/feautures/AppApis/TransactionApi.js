import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TRANSACTION_API = `http://localhost:3000/api/transaction`;

export const TransactionApi = createApi({
  reducerPath: "TransactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TRANSACTION_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: `/createcheckout`,
        method: "POST",
        body: { courseId },
      }),
    }),
    completeTransaction: builder.mutation({
      query: (paymentId) => ({
        url: `/completetransaction`,
        method: "POST",
        body: { sessionId: paymentId },
      }),
    }),
    purchaseStatus: builder.query({
      query: (courseId) => ({
        url: `/purchasestatus/${courseId}`,
        method: "GET",
      }),
    }),
    getAllPurchaseCourse: builder.query({
      query: () => ({
        url: `/getallpurchasecourse`,
        method: "GET",
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/getcourselecture/${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useCompleteTransactionMutation,
  useGetAllPurchaseCourseQuery,
  usePurchaseStatusQuery,
  useGetCourseLectureQuery,
} = TransactionApi;
