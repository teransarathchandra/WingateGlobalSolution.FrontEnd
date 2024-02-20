import { lazy } from "react";

// const ReportedPost = lazy(() => import("./pages/ReportedPost"));
const Home = lazy(() => import("../pages/Home"));
const Order = lazy(() => import("../pages/Order"));

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
        path: "*",
        element: <NotFound />,
    },
]
