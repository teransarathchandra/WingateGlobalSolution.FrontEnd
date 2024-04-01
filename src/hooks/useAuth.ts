import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@app_redux/actions/authActions";
import SignUpFormData from "@app_interfaces/ISignUp";
import IRootState from "@app_interfaces/IRootState";

interface ILoginCredentials {
  email: string;
  password: string;
}

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IRootState) => state.auth);
  const loginUser = useCallback(
    async (credentials: ILoginCredentials) => {
      return dispatch(login(credentials));
    },
    [dispatch]
  );

  const registerUser = useCallback(
    (userData: SignUpFormData) => {
      dispatch(register(userData));
    },
    [dispatch]
  );

  return { loginUser, registerUser, auth };
};

export default useAuth;
