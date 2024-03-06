export interface IRestrictedOrder{
  _id: string;
  maxQuantity: number;
  exportLicense: boolean;
  importPermit: boolean;
  safetyDataSheets: boolean;
  phytosanitaryCertificate: boolean;
  dangerousGoodsDeclaration: boolean;
  categoryId: string;
  sendingCountryId: string;
  receivingCountryId: string;
  createdAt: string;
  updatedAt: string;
  restrictedOrderId: string; 
  __v: number;
}

export interface IApiResponse {
    status: number;
    data: IRestrictedOrder[];
    message: string;
}
