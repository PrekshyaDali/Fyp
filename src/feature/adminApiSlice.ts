import { apiSlice } from "@/app/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNotification: builder.mutation({
      query: (body) => ({
        url: "/addNotification",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "notification", id: "LIST" }],
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
      invalidatesTags: [{ type: "regularCustomer", id: "LIST" }],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: "/getNotification",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "notification", id: "LIST" }],
    }),

    getRegularCustomer: builder.query({
      query: () => ({
        url: "/getRegularCustomer",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "regularCustomer", id: "LIST" }],
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
