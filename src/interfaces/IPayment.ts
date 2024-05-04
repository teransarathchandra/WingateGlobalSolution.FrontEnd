export interface IPayment {
    _id: string;
    paymentId: number;
    orderId: string;
    paymentDate: Date;
    description: string;
    paymentStatus: string;
    currency: string;
    amount: number;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        deliveryDetails: {
            address: string;
            city: string;
            country: string;
        };
    };
    amountDetail: {
        currency: string;
        gross: number;
        fee: number;
        net: number;
        exchangeRate: number;
        exchangeFrom: string;
        exchangeTo: string;
    };
    paymentMethod: {
        method: string;
        cardCustomerName: string;
        cardNo: string;
    };
    items: Array<{
        name: string;
        quantity: number;
        currency: string;
        unitPrice: number;
        totalPrice: number;
    }>;
    customFields: {
        custom1: any;
        custom2: any;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface IApiResponse {
    status: number;
    data: IPayment[];
    message: string;
}
