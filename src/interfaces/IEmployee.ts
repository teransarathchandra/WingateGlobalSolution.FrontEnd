export default interface RootObject {
  name: {
    firstName: string;
    lastName: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    countryId?: number;
  };
  email: string;
  password: string;
  contactNumber: number;
  accessToken: string;
  refreshToken: string;
  employeeId: string;
  isAdmin: boolean;
  focus: String;
}
