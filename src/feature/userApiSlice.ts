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
      // delete from admin table
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
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
    ChangePassword: builder.mutation({
      query: (body) => ({
        url: "/getinstructors",
        method: "POST",
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




    getUsers: builder.query({
      // get the users to admin table
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Instructor", id: "LIST" }],
    }),

    editUsers: builder.query({
      // show the edit information of the users from admin table
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Instructor", id: "LIST" }],
    }),

    editDetails: builder.mutation({
      // update the information of the users from admin table
      query: ({id, ...rest}) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        
      }),
      invalidatesTags: [{ type: "Instructor", id: "LIST" }],
    }),

    getDashboardCount: builder.query({
      query: () => ({
        url: "/DashboardCount",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Instructor", id: "LIST" }],
    }),

    getInstructors: builder.query({
      query: () => ({
        url: "/instructors",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Instructor", id: "LIST" }],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/getUsers",
        method: "GET",
      }),
    }),

    getSearch: builder.query({
      query: (body) => ({
        url: "/register",
        method: "GET",
        body,
      }),
    }),

    getCourses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Course", id: "LIST" }],
    }),

    getCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Course", id: "LIST" }],
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
  useChangePasswordMutation,
  useEditDetailsMutation,


  useGetCourseQuery,
  useGetCoursesQuery,
  useGetUsersQuery,
  useEditUsersQuery,
  useRegisterInstructorMutation,
  useGetDashboardCountQuery,
  useGetSearchQuery,
  useGetProfileQuery,
  useGetInstructorsQuery,
} = userApiSlice;
