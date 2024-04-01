export interface IFlight {
    _id: string;
    type: string;
    routeCostPerKilo: number;
    arrival: string;
    arrivalTime: string;
    departure: string;
    departureTime: string;
    AirlineId : string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface IApiResponse {
    status: number;
    data: IFlight[];
    message: string;
}
