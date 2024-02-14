import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_LOGIN_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../constants/authConstants';
import { startLoading, stopLoading } from './loadingActions';

// eslint-disable-next-line no-undef
const BASE_URL = process.env.API_URL;

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
        const { data } = await axios.post(`${BASE_URL}/user/login`, { email: credentials.email, password: credentials.password });
        dispatch(loginSuccess(data));
        dispatch(resetLoginErrors());
    } catch (error) {
        dispatch(loginFailure(error.response.data));
    } finally {
        dispatch(stopLoading());
    }
};

export const register = (userData) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(registerRequest());
    try {
        const { data } = await axios.post(`${BASE_URL}/user`, userData);
        dispatch(registerSuccess(data));
        // Optionally reset login errors here as well if it makes sense in your context
        // dispatch(resetLoginErrors());
    } catch (error) {
        dispatch(registerFailure(error.response.data));
    } finally {
        dispatch(stopLoading());
    }
};