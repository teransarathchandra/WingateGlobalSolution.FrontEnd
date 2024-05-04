export interface IOrder {
    _id?: string;
    orderId?: string;
    status: 'InProgress' | 'Processing' | 'Completed' | 'Pending' | 'Approved' | 'Rejected';
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

export interface IResOrder {
    _id: string;
    orderId: string;
    status: string;
    itemId: string; 
    sendingCountry: string;
    receivingCountry: string;
    isPickupOrder: string;
    priority: string;
    userId: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
}

export interface IApiResponse {
    status: number;
    data: IOrder[];
    message: string;
}