import { apiSlice } from "@/app/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
         registerInstructor: builder.mutation({
            query: (body) => ({
                url: "/registerInstructor",
                method: "POST",
                body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
        otp : builder.mutation({
            query: (body) => ({
                url: "/sendOtp",
                method: "POST",
                body,
            }),
        }),
        otpVerify : builder.mutation({
            query: (body) => ({
                url: "/verifyotp",
                method: "POST",
                body,
            }),
        }),
        ForgetPassword : builder.mutation({
            query: (body) => ({
                url: "/ForgetPassword",
                method: "POST",
                body,
            }),
        }),
        SendPassword : builder.mutation({
            query: (body) =>({
                url: "/SendPassword",
                method: "POST",
                body,
            })
        })
    }),
    });


    export const { useRegisterMutation } = userApiSlice;
    export const { useLoginMutation } = userApiSlice;
    export const {useOtpMutation} = userApiSlice;
    export const {useOtpVerifyMutation} = userApiSlice;
    export const {useForgetPasswordMutation} = userApiSlice;
    export const {useRegisterInstructorMutation} = userApiSlice;
    export const {useSendPasswordMutation}= userApiSlice;