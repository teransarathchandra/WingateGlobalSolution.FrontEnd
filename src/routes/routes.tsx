import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Order = lazy(() => import("../pages/dashboard/Order"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const ChooseDestination = lazy(() => import("../pages/customer/order/ChooseDestination"));
const ShipmentDetails = lazy(() => import("../pages/customer/order/ShipmentDetails"));
const RequiredDocuments = lazy(() => import("../pages/customer/order/RequiredDocuments"));
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
        path: "/order/destination",
        component: ChooseDestination,
    },
    {
        path: "/order/shipment",
        component: ShipmentDetails,
    },
    {
        path: "/order/required-documents",
        component: RequiredDocuments,
    },
    {
        path: "*",
        component: NotFound,
    },
];
