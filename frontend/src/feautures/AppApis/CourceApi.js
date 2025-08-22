import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURCE_API = `${import.meta.env.VITE_BACKEND_URL}/cource/`;
export const CourceApi = createApi({
  reducerPath: "CourceApi",
  tagTypes: ["Refetch_Creator_Cource", "Refetch_Creator_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURCE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addCource: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "addcourse",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Cource"],
    }),
    getAllCource: builder.query({
      query: () => ({
        url: "getallcourses",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Cource"],
    }),
    editCource: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `updatecourse/${courseId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Cource"],
    }),
    deleteCource: builder.mutation({
      query: ({ courseId }) => ({
        url: `deletecourse/${courseId}`,
        method: "DELETE",
      }),
    }),
    getCourseById: builder.query({
      query: ({ courseId }) => ({
        url: `getcoursebyid/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `createlecture/${courseId}`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getLecture: builder.query({
      query: (courseId) => ({
        url: `getlecture/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        isPreviewFree,
        uploadVideoInfo,
        courseId,
        lectureId,
      }) => ({
        url: `${courseId}/editlecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, isPreviewFree, uploadVideoInfo },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `removelecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `getlecturebyid/${lectureId}`,
        method: "GET",
      }),
    }),
    togglePublish: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `togglepublish/${courseId}?publish=${query}`,
        method: "PUT",
      }),
      invalidatesTags: ["Refetch_Creator_Cource"],
    }),
    getPubishedCourse: builder.query({
      query: () => ({
        url: `getpublishedcourse`,
        method: "GET",
      }),
    }),
    getCourseByCategory: builder.mutation({
      query: (body) => ({
        url: "getcoursebycategory",
        method: "POST",
        body,
      }),
    }),
    searchCoursesByName: builder.query({
      query: (name) => `courses/search?name=${encodeURIComponent(name)}`,
    }),
  }),
});

export const {
  useAddCourceMutation,
  useGetAllCourceQuery,
  useEditCourceMutation,
  useDeleteCourceMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  useTogglePublishMutation,
  useGetPubishedCourseQuery,
  useGetCourseByCategoryMutation,
  useSearchCoursesByNameQuery,
} = CourceApi;
