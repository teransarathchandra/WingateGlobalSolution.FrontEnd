export default interface ISignUpFormData {
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
  countryId?: string;
  designationId?: string;
  contactNumber?: number;
}
