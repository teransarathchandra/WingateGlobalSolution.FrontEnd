export interface IBulk {
    _id: string;
    currentLocation: string;
    arrivedTime: string;
    status: string;
    vehicleId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface IApiResponse {
    status: number;
    data: IBulk[];
    message: string;
}
