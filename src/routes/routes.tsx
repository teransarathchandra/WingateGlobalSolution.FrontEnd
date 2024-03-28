import { lazy } from "react";

//Common
const NotFound = lazy(() => import("@app_pages/NotFound"));

//Landing
const Home = lazy(() => import("@app_pages/Home"));
const VerifyEmail = lazy(() => import("@app_pages/VerifyEmail"));
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));

//Order
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//Employee
const EmployeeCheckpoint = lazy(() => import("@app_pages/Home"));

export const privateRoutes = [
    {
        path: "/app/",
        component: Home,
    },
    {
        path: "/app/order",
        component: Order,
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
