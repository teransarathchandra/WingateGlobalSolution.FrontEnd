import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_LOGIN_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GOOGLE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAILURE,
  GOOGLE_LOGIN_FAILURE,
  LOGOUT,
} from "@app_redux/constants/authConstants";
import { startLoading, stopLoading } from "./loadingActions";
// import api from '@app_utils/apiUtils';
import SignUpFormData from "@app_interfaces/ISignUp";

//User Login
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const resetLoginErrors = () => ({
  type: RESET_LOGIN_ERRORS,
});

export const googleLoginSuccess = (user) => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: user,
});

export const googleLoginFailure = (error) => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const login =
  (api, credentials): any =>
  async (dispatch) => {
    dispatch(startLoading());
    dispatch(loginRequest());
    try {
      const { data } = await api.post(`/user/login`, credentials);
      dispatch(loginSuccess(data.user));
      dispatch(resetLoginErrors());
    } catch (error: any) {
      dispatch(loginFailure(error.response.data));
    } finally {
      dispatch(stopLoading());
    }
  };

export const googleLogin =
  (api, token): any =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await api.post("/user/auth/google", { token });
      dispatch(googleLoginSuccess(data.user));
      dispatch(resetLoginErrors());
    } catch (error: any) {
      dispatch(loginFailure(error.response.data));
    } finally {
      dispatch(stopLoading());
    }
  };

export const register =
  (api, userData: SignUpFormData): any =>
  async (dispatch) => {
    dispatch(startLoading());
    dispatch(registerRequest());
    try {
      const response = await api.post(`/user`, userData);
      dispatch(registerSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(registerFailure(error.response.data));
    } finally {
      dispatch(stopLoading());
    }
  };

//MARK: Employee
export const employeeLoginRequest = () => ({
  type: EMPLOYEE_LOGIN_REQUEST,
});

export const employeeLoginSuccess = (employee) => ({
  type: EMPLOYEE_LOGIN_SUCCESS,
  payload: employee,
});

export const employeeLoginFailure = (error) => ({
  type: EMPLOYEE_LOGIN_FAILURE,
  payload: error,
});

export const employeeRegister =
  (api, userData: SignUpFormData): any =>
  async (dispatch) => {
    dispatch(startLoading());
    dispatch(registerRequest());
    try {
      const response = await api.post(`/employee`, userData);
      dispatch(registerSuccess(response.data));
      return response;
    } catch (error: any) {
      dispatch(registerFailure(error.response.data));
    } finally {
      dispatch(stopLoading());
    }
  };

export const employeeLogin =
  (api, credentials): any =>
  async (dispatch) => {
    dispatch(startLoading());
    dispatch(employeeLoginRequest());
    try {
      const { data } = await api.post(`/employee/login`, credentials);
      dispatch(employeeLoginSuccess(data.employee));
      dispatch(resetLoginErrors());
      console.log("authAction: employeeLogin: ", data.employee);
    } catch (error: any) {
      dispatch(employeeLoginFailure(error.response.data));
    } finally {
      dispatch(stopLoading());
    }
  };
