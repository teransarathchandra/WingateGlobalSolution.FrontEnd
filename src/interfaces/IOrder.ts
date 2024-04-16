export interface IOrder {
    _id: string;
    status: string;
    packageCount: number;
    orderType: string;
    userId: string;
    routeId: string;
    stockId: string;
    packageId: string;
    createdAt: string;
    updatedAt: string;
    orderId: string;
}

export interface IApiResponse {
    status: number;
    data: IOrder[];
    message: string;
}
