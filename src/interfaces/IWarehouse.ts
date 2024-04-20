export interface IWarehouse {
    _id: string;
    capacity: number;
    availability: string;
    location: string;
   
}

export interface IApiResponse {
    status: number;
    data: IWarehouse[];
    message: string;
}
