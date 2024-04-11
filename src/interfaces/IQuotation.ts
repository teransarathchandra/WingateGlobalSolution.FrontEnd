export interface IQuotation {
    _id: string;
    quotationId: string;
    packagingCost: number;
    routeCost: number;
    unitWeightCost: number;
    pickUpCost: number;
    surcharge: number; 
    createdAt: string;
    updatedAt: string;
    orderId: string;
    __v: number;
}

export interface IApiResponse {
    status: number;
    data: IQuotation[];
    message: string;
}
