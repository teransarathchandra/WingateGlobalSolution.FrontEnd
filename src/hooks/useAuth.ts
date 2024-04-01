import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@app_redux/actions/authActions";
import AuthActions from "@app_interfaces/IAuthActions";
import SignUpFormData from "@app_interfaces/ISignUp";

const useAuth = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state: AuthActions) => state.auth.error);

  const loginUser = useCallback(
    ({ email, password }) => {
      dispatch(login({ email, password }));
    },
    [dispatch]
  );

  const registerUser = useCallback(
    (userData: SignUpFormData) => {
      dispatch(register(userData));
    },
    [dispatch]
  );

  return { loginUser, registerUser, authError };
};

export default useAuth;
