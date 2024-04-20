export default interface RootObject {
  accessToken: string;
  refreshToken: string;
  employeeId: string;
  firstName: string;
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
}
