interface IName {
    firstName: string;
    lastName: string;
}

interface IAddress {
    street: string;
    city: string;
    state: string;
    country: string;
}

export default interface IUser {
    _id: string;
    userId: string;
    name: IName;
    email: string;
    contactNumber: number;  // Note the type change to number based on the API response
    address: IAddress;
    accessToken: string;
    refreshToken: string;
}