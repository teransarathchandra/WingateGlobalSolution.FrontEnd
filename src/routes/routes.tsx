import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Order = lazy(() => import("../pages/dashboard/order/Order"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const PlaceOrder = lazy(() => import("../pages/customer/order/Order"));
const Bulk = lazy(() => import("../pages/Bulk"));

const NotFound = lazy(() => import("../pages/NotFound"));

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
        path: "bulk",
        element: <Bulk />,
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
        path: "*",
        component: NotFound,
    },
];
