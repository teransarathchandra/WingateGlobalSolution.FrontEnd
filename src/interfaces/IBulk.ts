export interface IBulk {
    _id: string;
    bulkId: string;
    currentLocation: string;
    arrivedTime: string;
    destinationCountry: string;
    status: string;
    flightId: string;
    masterAirwayBillId: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface IApiResponse {
    status: number;
    data: any//IBulk[];
    message: string;
}
