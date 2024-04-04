import { lazy } from "react";

//Common
const NotFound = lazy(() => import("@app_pages/NotFound"));

//Landing
const Home = lazy(() => import("@app_pages/Home"));
const VerifyEmail = lazy(() => import("@app_pages/VerifyEmail"));
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));
const Category = lazy(() => import("../pages/dashboard/category/Category"));
const RestrictedOrderType = lazy(() => import("../pages/dashboard/restrictedOrder/RestrictedOrderType"));


//Order
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

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
    // {
    //     path: "/app/restrictedOrder",
    //     component: RestrictedOrder,
    // },
    {
        path: "/app/restrictedOrderType",
        component: RestrictedOrderType,
    },
    {
        path: "/app/category",
        component: Category,
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
