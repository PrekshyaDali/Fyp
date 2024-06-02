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
      providesTags: (result) => [{ type: "notification", id: "LIST" }],
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
      query: (ids) => ({
        url: `/deleteNotifications`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: [{ type: "notification", id: "LIST" }],
    }),

    updateVehicleStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/updateVehicle/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    addCustomizeCourse: builder.mutation({
      query: (body) => ({
        url: "/customize",
        method: "POST",
        body: body,
      }),
    }),
    getCustomizeData: builder.mutation({
      query: ({category, duration}) => ({
        url: "/getCustomizeData",
        method: "POST",
      }),
    }),
    getCustomizeDetail: builder.query({
      query: () => ({
        url: "/getCustomizeDetail",
        method: "GET",
      }),
    }),

    getPaymentKhalti: builder.query({
      query: (userId) => ({
        url: `/Khalti/${userId}`,
        method: "GET",
      }),
    }),

    getVehicle: builder.query({
      query: () => ({
        url: "/getVehicle",
        method: "GET",
      }),
    }),

    getFinanceData: builder.query({
      query: () => ({
        url: "/getFinanceData",
        method: "GET",
      }),
    }),

    getFilteredFinanceData: builder.query({
      query: ({ filterType, startDate, endDate, paymentMethod }) => {
        let queryString = `?filterType=${filterType}&paymentMethod=${paymentMethod}`;
        if (startDate) queryString += `&startDate=${startDate}`;
        if (endDate) queryString += `&endDate=${endDate}`;
        return `/getFilteredFinances${queryString}`;
      },
    }),
    exportFinanceDataPDF: builder.query({
      query: ({ filterType, paymentMethod, startDate, endDate }) => ({
        url: "/finances",
        params: { filterType, paymentMethod, startDate, endDate, export: "pdf" },
        responseHandler: (response) => response.blob(),
      }),
    }),

    ///////
  }),

  ///////////////
});

export const {
  useAddNotificationMutation,

  useDeleteCourseMutation,
  useAddregularCustomerMutation,
  useAddVehiclesMutation,
  useDeleteNotificationMutation,
  useUpdateVehicleStatusMutation,
  useAddCustomizeCourseMutation,
  useGetCustomizeDetailQuery,

  useGetNotificationsQuery,
  useGetRegularCustomerQuery,
  useGetNotificationByWeekQuery,
  useShowNotificationToAdminQuery,
  useGetPaymentKhaltiQuery,
  useGetVehicleQuery,
  useGetFinanceDataQuery,
  useGetFilteredFinanceDataQuery,
  useExportFinanceDataPDFQuery,
  useGetCustomizeDataMutation,
} = adminApiSlice;
