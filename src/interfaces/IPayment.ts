export interface IPayment {
    _id: string;
    paymentId: string;
    amount: number;
    paymentMethod: string;
    paymentstatus: string;
    paymentDate: Date;
    orderId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IApiResponse {
    status: number;
    data: IPayment[];
    message: string;
}
