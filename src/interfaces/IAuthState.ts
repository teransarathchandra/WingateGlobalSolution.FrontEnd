import IEmployee from "./IEmployee";
import IUser from "./IUser";

export default interface IAuthState {
  user: IUser | null;
  employee: IEmployee | null;
  error: {
    status: number;
    message: string;
  } | null;
  loading: boolean;
}
