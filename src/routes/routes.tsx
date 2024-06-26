import { lazy } from "react";
import { IRoute } from "@app_interfaces/IRoute"
//Landing
const Home = lazy(() => import("@app_pages/Home"));

// Verify User
const VerifyEmail = lazy(() => import("@app_pages/user/verify/VerifyEmail"));

//Place Order User
const PlaceOrder = lazy(() => import("@app_pages/customer/order/Order"));
const Category = lazy(() => import("@app_pages/dashboard/category/Category"));
const Country = lazy(() => import("@app_pages/dashboard/country/Country"));
const RestrictedOrderType = lazy(
  () => import("@app_pages/dashboard/restrictedOrder/RestrictedOrderType")
);
const TrackOrder = lazy(() => import("@app_pages//customer/order/TrackOrder"));

//Order Dashboard
const Order = lazy(() => import("@app_pages/dashboard/order/Order"));

//User
const User = lazy(() => import("@app_pages/dashboard/user/User"));

//Restricted Order Dashboard
const RestrictedOrders = lazy(() => import("@app_pages/dashboard/restrictedOrder/RestrictedOrders"));

//Employee
const EmployeeCheckpoint = lazy(
  () => import("@app_pages/employee/signin/EmployeeSignIn")
);

//Bulk
const Bulk = lazy(() => import("@app_pages/transport/Bulk"));

//Flight
const Flight = lazy(() => import("@app_pages/transport/Flight"));

//Airline
const Airline = lazy(() => import("@app_pages/transport/Airline"));

//Bulk Details
const BulkDetails = lazy(() => import("@app_pages/transport/BulkDetails"));

//Warehouse
const Warehouse = lazy(
  () => import("@app_pages/dashboard/warehouse/Warehouse")
);

//Warehouse Infor
const WarehouseInfo = lazy(
  () => import("@app_pages/dashboard/warehouse/WarehouseInfo")
);

//Assign Details
const AssignDetails = lazy(
  () => import("@app_pages/dashboard/warehouse/AssignDetails")
);

//Order Aggregation
const OrderAggregation = lazy(
  () => import("@app_pages/transport/OrderAggregation")
);

//Employee
const EmployeeAccess = lazy(
  () => import("@app_pages/employee/access/EmployeeAccess")
);
const EmployeeManage = lazy(
  () => import("@app_pages/employee/manage/EmployeeManage")
);

//Order Info
const OrderInfo = lazy(() => import("@app_pages/transport/Order"));

//Payment
const Payment = lazy(() => import("@app_pages/finance/Payment"));

//Quotation
const Quotation = lazy(() => import("@app_pages/finance/Quotation"));

//Profit
const Profit = lazy(() => import("@app_pages/finance/Profit"));

//Common
const NotFound = lazy(() => import("@app_pages/common/PageNotFound"));

//User Profile
const UserSettings = lazy(() => import("@app_pages/user/UserSettings"));

//User Profile
const UserPassword = lazy(() => import("@app_pages/user/UserPassword"));

//Customer
const Customer = lazy(() => import("@app_pages/dashboard/crm/Customer"));

//portal
const Portal = lazy(() => import("@app_pages/employee/portal/portal-welcome"));

export const privateRoutes: IRoute[] = [
  {
    path: "/order",
    component: PlaceOrder,
    isPrivate: true,
    forEmployeeOnly: false,
  },
  {
    path: "/app/order",
    component: Order,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/bulk",
    component: Bulk,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/flight",
    component: Flight,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/airline",
    component: Airline,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/bulk-details",
    component: BulkDetails,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/assign-details",
    component: AssignDetails,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/order-aggregation",
    component: OrderAggregation,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/warehouse",
    component: Warehouse,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/warehouseInfo",
    component: WarehouseInfo,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/restricted-order-type",
    component: RestrictedOrderType,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/category",
    component: Category,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/country",
    component: Country,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/crm",
    component: Customer,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/order-info",
    component: OrderInfo,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/employee-access",
    component: EmployeeAccess,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/employee-manage",
    component: EmployeeManage,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/user",
    component: User,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/quotation",
    component: Quotation,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/payment",
    component: Payment,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/profit",
    component: Profit,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/restricted-orders",
    component: RestrictedOrders,
    isPrivate: true,
    forEmployeeOnly: true,
  },
  {
    path: "/app/portal-welcome",
    component: Portal,
    isPrivate: true,
    forEmployeeOnly: true,
  },
];

export const publicRoutes: IRoute[] = [
  {
    path: "/",
    component: Home,
    isPrivate: false,
    forEmployeeOnly: false,
  },
  {
    path: "/home",
    component: Home,
    isPrivate: false,
    forEmployeeOnly: false,
  },
  {
    path: "/track-order",
    component: TrackOrder,
    isPrivate: false,
    forEmployeeOnly: false,
  },
  {
    path: "/verify-email/:token",
    component: VerifyEmail,
    isPrivate: false,
    forEmployeeOnly: false,
  },
  {
    path: "/user-info",
    component: UserSettings,
    isPrivate: false,
    forEmployeeOnly: false,
  },
  {
    path: "/user-password",
    component: UserPassword,
    isPrivate: false,
    forEmployeeOnly: false,
  },
  {
    path: "/emp-checkpoint",
    component: EmployeeCheckpoint,
    isPrivate: false,
    forEmployeeOnly: false,
  },
  {
    path: "*",
    component: NotFound,
    isPrivate: false,
    forEmployeeOnly: false,
  },
];
