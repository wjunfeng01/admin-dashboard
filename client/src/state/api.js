//This page runs a RTK query to pass data from backend to frontend
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //we are fetching data from route with tag types defined 2 lines below
  //eg. getUser build.query initiates a query using the getUser function from controller
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    //endpoint builds the query we have stored in the route when controller fnc called
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags:["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"]
    }),
    getDashboardStats: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"]
    }),
  }),
});

//WE CAN EXCESS THE DATA THAT OUR CONTROLLER RETURNS VIA USEGET__QUERY BELOW
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardStatsQuery
} = api;
