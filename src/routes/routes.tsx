import { lazy } from "react";

const Home = lazy(() => import("@app_pages/Home"));
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));
const VerifyEmail = lazy(() => import("@app_pages/VerifyEmail"));
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));
const NotFound = lazy(() => import("@app_pages/NotFound"));

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
    {
        path: "*",
        component: NotFound,
    },
];
