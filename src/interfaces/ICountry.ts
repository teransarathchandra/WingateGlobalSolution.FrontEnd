export interface ICountry {
    _id?: string;
    countryId?: string;
    countryCode: string;
    name: string;
    currency: number;
    createdAt: string;
    updatedAt: string;
}

export interface IApiResponse {
    status: number;
    data: ICountry[];
    message: string;
}
