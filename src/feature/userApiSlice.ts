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
    }),
    getSearch: builder.query({
      query: (body) => ({
        url: "/register",
        method: "GET",
        body,
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



  useGetUsersQuery,
  useRegisterInstructorMutation,
  useGetDashboardCountQuery,
  useGetSearchQuery
} = userApiSlice;
