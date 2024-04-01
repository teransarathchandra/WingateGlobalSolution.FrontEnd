import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Order = lazy(() => import("../pages/dashboard/order/Order"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const PlaceOrder = lazy(() => import("../pages/customer/order/Order"));
const Bulk = lazy(() => import("../pages/Bulk"));
const Flight = lazy(() => import("../pages/Flight"));

const NotFound = lazy(() => import("../pages/NotFound"));

export const privateRoutes = [
    {
        path: "/app/",
        component: Home,
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
