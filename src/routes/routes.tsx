import { lazy } from "react";
import VerifyEmail from "../pages/VerifyEmail";

const Home = lazy(() => import("../pages/Home"));
const Order = lazy(() => import("../pages/Order"));
const User = lazy(() => import("../pages/User"));


const NotFound = lazy(() => import("../pages/NotFound"));

export const privateRoutes = [
    {
        path: "/",
        element: <Home/>,
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
        element: <Home/>,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/verify-email/:token",
        element: <VerifyEmail />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]
