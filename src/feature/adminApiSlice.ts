import { apiSlice } from "@/app/apiSlice";
import { add } from "date-fns";

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
    getNotificationByWeek: builder.query({
      query: () => ({
        url: "/getNotificationByWeek",
        method: "GET",
      }),
    }),
    showNotificationToAdmin: builder.query({
      query: () => ({
        url: "/showNotificationToAdmin",
        method: "GET",
      }),
    }),

    getRegularCustomer: builder.query({
      query: () => ({
        url: "/getRegularCustomer",
        method: "GET",
      }),
      providesTags: (result) => [{ type: "regularCustomer", id: "LIST" }],
    }),

    // Vehicles
    addVehicles: builder.mutation({
      query: (body) => ({
        url: "/addVehicle",
        method: "POST",
        body,
      }),
    }),
    deleteNotification: builder.mutation({
      query: (body) => ({
        url: `/deleteNotifications`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "notification", id: "LIST" }],
    }),

    getPaymentKhalti: builder.query({
      query: (userId) => ({
        url: `/Khalti/${userId}`,
        method: "GET",
      }),
    }),
  }),




});

export const {
  useAddNotificationMutation,

  useDeleteCourseMutation,
  useAddregularCustomerMutation,
  useAddVehiclesMutation,
  useDeleteNotificationMutation,

  useGetNotificationsQuery,
  useGetRegularCustomerQuery,
  useGetNotificationByWeekQuery,
  useShowNotificationToAdminQuery,
  useGetPaymentKhaltiQuery
} = adminApiSlice;
