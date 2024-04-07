import { lazy } from "react";

//Landing
const Home = lazy(() => import("@app_pages/Home"));

// Verify User
const VerifyEmail = lazy(() => import("@app_pages/customer/verify/VerifyEmail"));

// Place Order User
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));
const Category = lazy(() => import("../pages/dashboard/category/Category"));
const Country = lazy(() => import("../pages/dashboard/country/Country"));
const RestrictedOrderType = lazy(() => import("../pages/dashboard/restrictedOrder/RestrictedOrderType"));


//Order Dashboard
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//Employee
const EmployeeCheckpoint = lazy(() => import("@app_pages/employee/signin/Employee_SignIn"));

//Bulk
const Bulk = lazy(() => import("@app_pages/transport/Bulk"));

//Flight
const Flight = lazy(() => import("@app_pages/transport/Flight"));

//Airline
const Airline = lazy(() => import("@app_pages/transport/Airline"));


//Bulk Details
const BulkDetails = lazy(() => import("@app_pages/transport/BulkDetails"));

//Order Aggregation
const OrderAggregation = lazy(() => import("@app_pages/transport/OrderAggregation"));

//Common
const NotFound = lazy(() => import("@app_pages/common/PageNotFound"));

export const privateRoutes = [
    {
        path: "/order",
        component: PlaceOrder,
        isPrivate: true,
    },
    //Dashboard
    {
        path: "/app/",
        component: Home,
        isPrivate: true,
    },    
    {
        path: "/app/order",
        component: Order,
        isPrivate: true,
    },
    {
        path: "/app/bulk",
        component: Bulk,
        isPrivate: false,
    },
    {
        path: "/app/flight",
        component: Flight,
        isPrivate: false,
    },
    {
        path: "/app/airline",
        component: Airline,
        isPrivate: false,
    },
    {
        path: "/app/bulkdetails",
        component: BulkDetails,
        isPrivate: false,
    },
    {
        path: "/app/orderaggregation",
        component: OrderAggregation,
        isPrivate: false,
    },
    {
        path: "/app/restrictedOrderType",
        component: RestrictedOrderType,
    },
    {
        path: "/app/category",
        component: Category,
    },
    {
        path: "/app/country",
        component: Country,
    },
    {
        path: "*",
        component: NotFound,
    },
];

export const publicRoutes = [
    {
        path: "/",
        component: Home,
        isPrivate: false,
    },
    {
        path: "/home",
        component: Home,
        isPrivate: false,
    },
    {
        path: "/verify-email/:token",
        component: VerifyEmail,
        isPrivate: false,
    },
    {
        path: "/emp_checkpoint",
        component: EmployeeCheckpoint,
        isPrivate: false,
    },
    {
        path: "*",
        component: NotFound,
        isPrivate: false,
    },
];
