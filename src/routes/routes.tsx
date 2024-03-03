import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Order = lazy(() => import("../pages/Order"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
        path: "*",
        component: NotFound,
    },
];
