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

    deleteCourse: builder.mutation({
      // delete from admin table
      query: (id) => ({
        url: `/deleteCourse/${id}`,
        method: "DELETE",
      }),
    }),

    addregularCustomer: builder.mutation({
      query: (body) => ({
        url: "/regularCustomerTracking",
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

    getRegularCustomer: builder.query({
      query: () => ({
        url: "/getRegularCustomer",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddNotificationMutation,

  useDeleteCourseMutation,
  useAddregularCustomerMutation,

  useGetNotificationsQuery,
  useGetRegularCustomerQuery,
} = adminApiSlice;
