import { lazy } from "react";

import Home from "../pages/Home";

// const ReportedPost = lazy(() => import("./pages/ReportedPost"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const privateRoutes = [
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
