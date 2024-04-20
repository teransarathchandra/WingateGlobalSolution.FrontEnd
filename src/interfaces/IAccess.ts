export interface IAccess {
  _id: string;
  accessLevelId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
}

export interface IApiResponse {
  status: number;
  data: IAccess[];
  message: string;
}
