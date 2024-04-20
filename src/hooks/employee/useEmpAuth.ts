import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeLogin,
  employeeRegister,
  logout,
} from "@app_redux/actions/authActions";
import SignUpFormData from "@app_interfaces/ISignUp";
import IRootState from "@app_interfaces/IRootState";
import { useNavigate } from "react-router-dom";

interface ILoginCredentials {
  email: string;
  password: string;
}

const useEmpAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employee, error, loading } = useSelector(
    (state: IRootState) => state.auth
  );

  const loginEmployee = useCallback(
    async (api, credentials: ILoginCredentials) => {
      const action = employeeLogin(api, credentials);
      dispatch(action);
    },
    [dispatch]
  );

  const registerEmployee = useCallback(
    async (api, userData: SignUpFormData) => {
      return dispatch(employeeRegister(api, userData));
    },
    [dispatch]
  );

  const logoutEmployee = useCallback(() => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  return {
    loginEmployee,
    registerEmployee,
    logoutEmployee,
    auth: { employee, error, loading },
  };
};

export default useEmpAuth;
