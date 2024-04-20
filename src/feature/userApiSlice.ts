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
    editCourseDetail: builder.mutation({
      query: ({ id, body }) => ({
        url: `/editCourses/${id}`,
        method: "PUT",
        body,
      }),
    }),

    uploadImg: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
    }),
    getImg: builder.query({
      query: (filename) => ({
        url: `/uploads/${filename}`,
        method: "GET",
      }),
    }),

    enrollment: builder.mutation({
      query: (body) => ({
        url: "/enrollment",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
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
    editProfileDetails: builder.mutation({
      // update the information of the users from admin table
      query: ({ id, formData }) => ({
        url: `/editProfile/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [{ type: "Instructor", id: "LIST" }],
    }),

    editDetails: builder.mutation({
      // update the information of the users from admin table
      query: ({ id, ...rest }) => ({
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
    getEnrollmentCount: builder.query({
      query: () => ({
        url: "/countEnrollment",
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
    getEnrollment: builder.query({
      query: () => ({
        url: "/getEnrollment",
        method: "GET",
      }),
    }),
    getEnrollmentById: builder.query({
      query: (id) => ({
        url: `/getEnrollmentId/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Course", id: "LIST" }],
    }),
    paymentTracking: builder.mutation({
      query: (body) => ({
        url: "/paymentTracking",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),
    getPaymentData: builder.query({
      query: (enrollmentId) => ({
        url: `/getPaymentData/${enrollmentId}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Payment", id: "LIST" }],
    }),

    attendance: builder.mutation({
      query: (body) => ({
        url: "/attendance",
        method: "POST",
        body,
      }),
    }),
    getAttendance: builder.query({
      query: (enrollmentId) => ({
        url: `/getAttendance/${enrollmentId}`,
        method: "GET",
      }),
    }),

    oneEnrollmentUser: builder.query({
      query: (enrollmentId) => ({
        url: `/oneEnrollmentUser/${enrollmentId}`,
        method: "GET",
      }),
    }),

    updateEnrollment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/enrollment/${id}`,
        method: "PATCH",
        body,
      }),
    }),

    getCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: (result) => [{ type: "Course", id: "LIST" }],
    }),
    // getImage: builder.query({
    //   query: () => ({
    //     url: "/getImage",
    //     method: "GET",
    //   }),
    // }),
    esewaPayment: builder.mutation({
      query: (formData) => ({
        url: "/esewa",
        method: "POST",
        body: formData,
      }),
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
  useEditCourseDetailMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useEditDetailsMutation,
  useUploadImgMutation,
  useEnrollmentMutation,
  useEditProfileDetailsMutation,
  useUpdateEnrollmentMutation,
  usePaymentTrackingMutation,
  useAttendanceMutation,
  useEsewaPaymentMutation,


  useGetPaymentDataQuery,

  useGetImgQuery,
  useGetCourseQuery,
  useGetCoursesQuery,
  useGetUsersQuery,
  useEditUsersQuery,
  useRegisterInstructorMutation,
  useGetDashboardCountQuery,
  useGetSearchQuery,
  useGetProfileQuery,
  useGetInstructorsQuery,
  useGetEnrollmentQuery,
  useGetEnrollmentCountQuery,
  useGetEnrollmentByIdQuery,
  useOneEnrollmentUserQuery,
  useGetAttendanceQuery,
  // useGetImageQuery,
} = userApiSlice;
