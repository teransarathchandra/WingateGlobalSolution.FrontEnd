

export interface ICustomer {
  _id: string;
  name: Name;
  email: string;
  contactNumber: string;
  address: Address;
  customerId: string;
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