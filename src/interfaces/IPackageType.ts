export interface IPackageType {
    _id?: string;
    packageId?: string;
    packageName: string;
    packagingCost: number;
    width: number;
    length: number;
    height: number;
    maximumWeight: number;
    maximumHeight: number;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export interface IApiResponse {
    status: number;
    data: IPackageType[];
    message: string;
}