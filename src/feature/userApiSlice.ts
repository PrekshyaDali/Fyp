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
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
        otp : builder.mutation({
            query: (body) => ({
                url: "/otp",
                method: "POST",
                body,
            }),
        }),
    }),
    });


    export const { useRegisterMutation } = userApiSlice;
    export const { useLoginMutation } = userApiSlice;
    export const {useOtpMutation} = userApiSlice;