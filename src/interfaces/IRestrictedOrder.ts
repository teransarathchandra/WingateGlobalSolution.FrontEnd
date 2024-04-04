export interface IRestrictedOrder{
  _id?: string;
  restrictedOrderId?: string;
  sendingCountryId: string;
  receivingCountryId: string;
  categoryId: string;
  maxQuantity: number;
  exportLicense: boolean;
  importPermit: boolean;
  safetyDataSheets: boolean;
  phytosanitaryCertificate: boolean;
  dangerousGoodsDeclaration: boolean;
  createdAt: string;
  updatedAt: string;
 
}

export interface IApiResponse {
    status: number;
    data: IRestrictedOrder[];
    message: string;
}
