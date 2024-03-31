import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_LOGIN_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    EMPLOYEE_LOGIN_REQUEST,
    EMPLOYEE_LOGIN_SUCCESS,
    EMPLOYEE_LOGIN_FAILURE,
    GOOGLE_LOGIN_SUCCESS
} from '@app_redux/constants/authConstants';

const initialState = {
    user: null,
    employee: null,
    error: null,
    loading: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                loading: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                user: null,
                loading: false,
            };
        case EMPLOYEE_LOGIN_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case EMPLOYEE_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                employee: null,
                loading: false,
            };
        case EMPLOYEE_LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                employee: null,
                loading: false,
            };
        case GOOGLE_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                employee: null,
                loading: false,
            };
        case RESET_LOGIN_ERRORS:
            return { ...state, error: null };
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default authReducer;