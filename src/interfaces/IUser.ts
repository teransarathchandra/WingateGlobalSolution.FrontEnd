
export interface IUser {
    _id: string;
    name: Name;
    address: Address;
    email: string;
    password: string;
    contactNumber: number;
    emailVerified: boolean;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    __v: number;
}

interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    _id: string;
}

interface Name {
    firstName: string;
    lastName: string;
    _id: string;
}

export interface IApiResponse {
    status: number;
    data: IUser[];
    message: string;
}