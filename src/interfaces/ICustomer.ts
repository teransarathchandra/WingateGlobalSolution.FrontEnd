export interface ICustomer {
    _id: string;
    customerId: string;
    name: Name;
    email: string;
    contactNumber: string;
    address: Address;
    priorityLevel: string;
    birthday: string;
    password: string;
  }
   
  interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
  }
   
  interface Name {
    firstName: string;
    lastName: string;
  }
   
  export interface IApiResponse {
    status: number;
    data: ICustomer[];
    message: string;
  }