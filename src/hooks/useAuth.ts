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
  const { user, employee, error, loading } = useSelector((state: IRootState) => state.auth);
  
  const loginUser = useCallback(
    async (api, credentials: ILoginCredentials) => {
      dispatch(login(api, credentials));
    },
    [dispatch]
  );

  const registerUser = useCallback(
    async (api, userData: SignUpFormData) => {
      return dispatch(register(api, userData));
    },
    [dispatch]
  );

  return { loginUser, registerUser, auth: { user, employee, error, loading } };
};

export default useAuth;
