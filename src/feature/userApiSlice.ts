import { apiSlice } from "@/app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Instructor", id: "LIST" }],
    }),
    registerInstructor: builder.mutation({
      query: (body) => ({
        url: "/registerInstructor",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Instructor", id: "LIST" }],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    otp: builder.mutation({
      query: (body) => ({
        url: "/sendOtp",
        method: "POST",
        body,
      }),
    }),
    otpVerify: builder.mutation({
      query: (body) => ({
        url: "/verifyotp",
        method: "POST",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE"
            }),
      invalidatesTags: [{ type: "Instructor", id: "LIST" }],
    }),
    ForgetPassword: builder.mutation({
      query: (body) => ({
        url: "/ForgetPassword",
        method: "POST",
        body,
      }),
    }),
    SendPassword: builder.mutation({
      query: (body) => ({
        url: "/SendPassword",
        method: "POST",
        body,
      }),
    }),

    getDashboardCount: builder.query({
      query: () => ({
        url: "/DashboardCount",
        method: "GET",
        
      }),
      providesTags: (result) => [{ type: "Instructor", id: "LIST" }]
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Instructor", id: "LIST" }]
    }),
    getSearch: builder.query({
      query: (body) => ({
        url: "/register",
        method: "GET",
        body,
      }),
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: "/addCourses",
        method: "POST",
        body,
      }),

    }),
    getCourses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Course", id: "LIST" }]
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Course", id: "LIST" }]
    }),
    
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useOtpMutation,
  useOtpVerifyMutation,
  useForgetPasswordMutation,
  useSendPasswordMutation,
  useAddCourseMutation,
  useDeleteUserMutation,
  useGetCourseQuery,
  useGetCoursesQuery,



  useGetUsersQuery,
  useRegisterInstructorMutation,
  useGetDashboardCountQuery,
  useGetSearchQuery
} = userApiSlice;
