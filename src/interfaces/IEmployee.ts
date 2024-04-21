

export default interface RootObject {
  accessToken: string;
  refreshToken: string;
  employeeId: string;
  name: {
    firstName: string;
    lastName: string;
  };
  lastName: string;
  email: string;
  contactNumber: number;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    countryId?: number;
  };
  focus: string;
  accessDescription: string;
  accessID: string;
}
