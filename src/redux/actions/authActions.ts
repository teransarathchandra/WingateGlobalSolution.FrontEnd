// import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_LOGIN_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GOOGLE_LOGIN_SUCCESS } from '../constants/authConstants';
import { startLoading, stopLoading } from './loadingActions';
// import toastUtil from "../../utils/toastUtil"
import api, { authenticateWithGoogle } from '../../utils/apiUtils';

// eslint-disable-next-line no-undef
// const BASE_URL = process.env.API_URL;

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

export const login = (credentials) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(loginRequest());
    try {
        const { data } = await api.post(`/user/login`, { email: credentials.email, password: credentials.password });
        dispatch(loginSuccess(data));
        dispatch(resetLoginErrors());
        // toastUtil.success(data.message);
    } catch (error: any) {
        dispatch(loginFailure(error.response.data));
        // toastUtil.error(error.response.data.message);
    } finally {
        dispatch(stopLoading());
    }
};

export const googleLogin = (token) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const { data } = await authenticateWithGoogle(token);
        dispatch(googleLoginSuccess(data.user)); // Assuming the API response includes the user object
        localStorage.setItem("accessToken", data.accessToken); // Save the token if needed
    } catch (error) {
        console.error('Error during Google login:', error);
        // Handle error (e.g., showing an error toast)
    } finally {
        dispatch(stopLoading());
    }
};

export const register = (userData) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(registerRequest());
    try {
        const { data } = await api.post(`/user`, userData);
        dispatch(registerSuccess(data));
        // toastUtil.success(data.message);
        // Optionally reset login errors here as well if it makes sense in your context
        // dispatch(resetLoginErrors());
    } catch (error: any) {
        dispatch(registerFailure(error.response.data));
        // toastUtil.error(error.response.data.message);
    } finally {
        dispatch(stopLoading());
    }
};