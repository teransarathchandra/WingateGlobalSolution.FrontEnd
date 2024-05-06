export interface ICategory{
    _id?: string;
    categoryId?: string;
    name: string;
    description: string;
    costPerKilo: number;
    createdAt: string;
    updatedAt: string;
   
  }
  
  export interface IApiResponse {
      status: number;
      data: ICategory[];
      message: string;
  }
  