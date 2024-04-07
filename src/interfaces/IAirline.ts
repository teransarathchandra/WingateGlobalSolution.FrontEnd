export interface IAirline {
    _id: string;
    code: string;
    name: string;
    __v: number;
  }

  export interface IApiResponse {
    status: number;
    data: IAirline[];
    message: string;
}
