import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_LOGIN_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GOOGLE_LOGIN_SUCCESS } from '../constants/authConstants';
import { startLoading, stopLoading } from './loadingActions';
import api, { authenticateWithGoogle } from '../../utils/apiUtils';
import SignUpFormData from '../../interfaces/ISignUp';

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

export const login = (credentials):any => async (dispatch) => {
    dispatch(startLoading());
    dispatch(loginRequest());
    try {
        const { data } = await api.post(`/user/login`, credentials);
        dispatch(loginSuccess(data));
        dispatch(resetLoginErrors());
    } catch (error: any) {
        dispatch(loginFailure(error.response.data));
    } finally {
        dispatch(stopLoading());
    }
};

export const googleLogin = (token) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const { data } = await authenticateWithGoogle(token);
        dispatch(googleLoginSuccess(data.user));
        localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
        console.error('Error during Google login:', error);
    } finally {
        dispatch(stopLoading());
    }
};

export const register = (userData: SignUpFormData):any => async (dispatch) => {
    dispatch(startLoading());
    dispatch(registerRequest());
    try {
        const { data } = await api.post(`/user`, userData);
        dispatch(registerSuccess(data));
    } catch (error: any) {
        dispatch(registerFailure(error.response.data));
    } finally {
        dispatch(stopLoading());
    }
};