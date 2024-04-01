import { lazy } from "react";

//Landing
const Home = lazy(() => import("@app_pages/Home"));

// Verify User
const VerifyEmail = lazy(() => import("@app_pages/customer/verify/VerifyEmail"));

// Place Order User
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));

//Order Dashboard
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//Employee
const EmployeeCheckpoint = lazy(() => import("@app_pages/employee/signin/Employee_SignIn"));

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
        component: Order ,
    },
    {
        path: "/app/bulk",
        component: Bulk,
    },
    {
        path: "/app/flight",
        component: Flight,
    },
    {
        path: "*",
        component: NotFound ,
        isPrivate: true,
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
