import IUser from "./IUser";

export default interface IAuthState {
  user: IUser | null;
  error: {
    status: number;
    message: string;
  } | null;
  loading: boolean;
}
