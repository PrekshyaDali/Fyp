import { apiSlice } from "@/app/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNotification: builder.mutation({
      query: (body) => ({
        url: "/addNotification",
        method: "POST",
        body,
      }),
    }),
    getNotifications: builder.query({
      query: () => ({
        url: "/getNotification",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddNotificationMutation, useGetNotificationsQuery } = adminApiSlice;
