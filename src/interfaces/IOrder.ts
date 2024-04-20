export interface IOrder {
    _id?: string;
    orderId?: string;
    status: 'InProgress' | 'Processing' | 'Completed' | 'Pending';
    stockId?: string;
    bulkId?: string;
    paymentId?: string;
    invoiceId?: string;
    itemId: string;
    senderId: string;
    receiverId: string;
    quotationId?: string;
    isPickupOrder: boolean;
    pickupDate?: Date;
    priority: 'Express' | 'Standard';
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApiResponse {
    status: number;
    data: IOrder[];
    message: string;
}
