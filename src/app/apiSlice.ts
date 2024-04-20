import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: (headers) => {
    // if you need to add global headers, do it here

    const token = localStorage.getItem("accessToken");

    if (token) {
      // Add the Authorization header if the token is present
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// if need to intercept the request, do it here
const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (!result.error) {
    console.log("Api call successfull");
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: ["Instructor","Course","Student","Payment", "Attendance"],
});
