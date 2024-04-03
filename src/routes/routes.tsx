import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Order = lazy(() => import("../pages/dashboard/order/Order"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const PlaceOrder = lazy(() => import("../pages/customer/order/Order"));
const RestrictedOrder = lazy(() => import("../pages/dashboard/restrictedOrder/RestrictedOrder"));
const RestrictedOrderType = lazy(() => import("../pages/dashboard/restrictedOrder/RestrictedOrderType"));

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
    {
        path: "/app/restrictedOrder",
        component: RestrictedOrder,
    },
    {
        path: "/app/restrictedOrderType",
        component: RestrictedOrderType,
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
    {
        path: "*",
        component: NotFound,
    },
];
