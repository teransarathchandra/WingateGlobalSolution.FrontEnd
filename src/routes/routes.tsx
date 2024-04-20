import { lazy } from "react";

//Landing
const Home = lazy(() => import("@app_pages/Home"));

//Verify User
const VerifyEmail = lazy(() => import("@app_pages/user/verify/VerifyEmail"));

//Place Order User
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));
const Category = lazy(() => import("@app_pages/dashboard/category/Category"));
const Country = lazy(() => import("@app_pages/dashboard/country/Country"));
const RestrictedOrderType = lazy(() => import("@app_pages/dashboard/restrictedOrder/RestrictedOrderType"));
const TrackOrder = lazy(() => import("@app_pages//customer/order/TrackOrder"));


//Order Dashboard
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//User
const User = lazy(() => import("@app_pages/dashboard/user/User"));

//Employee
const EmployeeCheckpoint = lazy(() => import("@app_pages/employee/signin/Employee_SignIn"));

//Bulk
const Bulk = lazy(() => import("@app_pages/transport/Bulk"));

//Flight
const Flight = lazy(() => import("@app_pages/transport/Flight"));

//Airline
const Airline = lazy(() => import("@app_pages/transport/Airline"));


//Bulk Details
const BulkDetails = lazy(() => import("@app_pages/transport/BulkDetails"));

//Order Aggregation
const OrderAggregation = lazy(() => import("@app_pages/transport/OrderAggregation"));

//Order Info
const OrderInfo = lazy(() => import("@app_pages/transport/Order"));

//Common
const NotFound = lazy(() => import("@app_pages/common/PageNotFound"));

//User Profile
const UserSettings = lazy(() => import("@app_pages/user/UserSettings"));

//User Profile
const UserPassword = lazy(() => import("@app_pages/user/UserPassword"));

//Customer
const Customer = lazy(() => import("@app_pages/dashboard/crm/Customer"));

export const privateRoutes = [
    {
        path: "/order",
        component: PlaceOrder,
        isPrivate: true,
    },
    {
        path: "/track-order",
        component: TrackOrder,
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
        isPrivate: true,
    },
    {
        path: "/app/flight",
        component: Flight,
        isPrivate: true,
    },
    {
        path: "/app/airline",
        component: Airline,
        isPrivate: true,
    },
    {
        path: "/app/bulk-details",
        component: BulkDetails,
        isPrivate: true,
    },
    {
        path: "/app/order-aggregation",
        component: OrderAggregation,
        isPrivate: true,
    },
    {
        path: "/app/restricted-order-type",
        component: RestrictedOrderType,
        isPrivate: true,
    },
    {
        path: "/app/category",
        component: Category,
    },
    {
        path: "/app/crm",
        component: Customer,
        isPrivate: false,
    },
    {
        path: "*",
        component: NotFound,
    },
    {
        path: "/app/order-info",
        component: OrderInfo,
        isPrivate: true,
    }
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
