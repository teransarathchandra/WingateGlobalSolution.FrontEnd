export default interface SignUpFormData {
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
  countryId?: number;
  designationId?: number;
  contactNumber?: number;
}
