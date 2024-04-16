import { lazy } from "react";

//Common
const NotFound = lazy(() => import("@app_pages/NotFound"));

//Landing
const Home = lazy(() => import("@app_pages/Home"));
const VerifyEmail = lazy(() => import("@app_pages/VerifyEmail"));
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));

//Order
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//Warehouse
const Warehouse = lazy(() => import("@app_pages/dashboard/warehouse/warehouse"));

//Employee
const EmployeeCheckpoint = lazy(() => import("@app_pages/employee/signin/Employee_SignIn"));

export const privateRoutes = [
    {
        path: "/app/",
        component: Home,
    },
    {
        path: "/app/order",
        component: Order,
    },
    {
        path: "/app/bulk",
        component: Bulk,
        isPrivate: true,
    },
    {
        path: "/app/flight",
        component: Flight,
        isPrivate: true,
    },
    {
        path: "/app/airline",
        component: Airline,
        isPrivate: true,
    },
    {
        path: "/app/bulk-details",
        component: BulkDetails,
        isPrivate: true,
    },
    {
        path: "/app/order-aggregation",
        component: OrderAggregation,
        isPrivate: true,
    },
    {
        path: "/app/restricted-order-type",
        component: RestrictedOrderType,
        isPrivate: true,
    },
    {
        path: "/app/category",
        component: Category,
        isPrivate: true,
    },
    {
        path: "/app/country",
        component: Country,
        isPrivate: true,
    }
    {
        path: "/app/warehouse",
        component: Warehouse,
    },
];

export const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/verify-email/:token",
        component: VerifyEmail,
    },
    {
        path: "/order",
        component: PlaceOrder,
    },

    //Employee
    {
        path: "/emp_checkpoint",
        component: EmployeeCheckpoint,
    },

    //Not Found
    {
        path: "*",
        component: NotFound,
    },
];
