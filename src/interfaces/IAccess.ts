export interface IAccess {
  _id: string;
  accessID: string;
  accessLevelId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  accessAreas: string;
}

export interface IApiResponse {
  status: number;
  data: IAccess[];
  message: string;
}
