import { lazy } from "react";

//Landing
const Home = lazy(() => import("@app_pages/Home"));

//Verify User
const VerifyEmail = lazy(() => import("@app_pages/customer/verify/VerifyEmail"));

//Place Order User
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));
const Category = lazy(() => import("../pages/dashboard/category/Category"));
const RestrictedOrderType = lazy(() => import("../pages/dashboard/restrictedOrder/RestrictedOrderType"));


//Order Dashboard
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//User
const User = lazy(() => import("@app_pages/dashboard/user/User"));

//Employee
const EmployeeCheckpoint = lazy(() => import("@app_pages/employee/signin/Employee_SignIn"));

//Bulk
const Bulk = lazy(() => import("@app_pages/Bulk"));

//Flight
const Flight = lazy(() => import("@app_pages/Flight"));

//Common
const NotFound = lazy(() => import("@app_pages/common/PageNotFound"));

//User Profile
const UserSettings = lazy(() => import("@app_pages/user/UserSettings"));

//User Profile
const UserPassword = lazy(() => import("@app_pages/user/UserPassword"));

export const privateRoutes = [
    {
        path: "/order",
        component: PlaceOrder,
        isPrivate: true,
    },
    //Dashboard
    {
        path: "/app/",
        component: Home,
        isPrivate: true,
    },    
    {
        path: "/app/order",
        component: Order,
        isPrivate: true,
    },    
    {
        path: "/app/user",
        component: User,
        isPrivate: false,
    },
    {
        path: "/app/restrictedOrderType",
        component: RestrictedOrderType,
    },
    {
        path: "/app/category",
        component: Category,
    },
    {
        path: "/app/bulk",
        component: Bulk,
        isPrivate: false,
    },
    {
        path: "/app/flight",
        component: Flight,
        isPrivate: false,
    },
];

export const publicRoutes = [
    {
        path: "/",
        component: Home,
        isPrivate: false,
    },
    {
        path: "/home",
        component: Home,
        isPrivate: false,
    },
    {
        path: "/verify-email/:token",
        component: VerifyEmail,
        isPrivate: false,
    },
    {
        path: "/emp_checkpoint",
        component: EmployeeCheckpoint,
        isPrivate: false,
    },
    {
        path: "*",
        component: NotFound,
        isPrivate: false,
    },

    {
        path: "/user-info",
        component: UserSettings,
        isPrivate: false,
    },

    {
        path: "/user-password",
        component: UserPassword,
        isPrivate: false,
    }
];
