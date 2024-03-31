import { lazy } from "react";

//Landing
const Home = lazy(() => import("@app_pages/Home"));

//Verify User
const VerifyEmail = lazy(() => import("@app_pages/customer/verify/VerifyEmail"));

//Place Order User
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));

//Order Dashboard
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//User
const User = lazy(() => import("@app_pages/dashboard/user/User"));

//Employee
const EmployeeCheckpoint = lazy(() => import("@app_pages/employee/signin/Employee_SignIn"));

//Common
const NotFound = lazy(() => import("@app_pages/common/PageNotFound"));

export const privateRoutes = [
    {
        path: "/app/",
        component: Home,
    },
    {
        path: "order",
        element: <Order />,
    },
    {
        path: "user",
        element: <User />,
    },
    {
        path: "*",
        element: <NotFound />,
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
    {
        path: "/emp_checkpoint",
        component: EmployeeCheckpoint,
    },
    {
        path: "*",
        component: NotFound,
    },
];
