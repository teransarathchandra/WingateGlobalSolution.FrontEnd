import { START_LOADING, STOP_LOADING } from '@app_redux/constants/loadingConstants';

const initialState = {
    isLoading: false,
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case STOP_LOADING:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

export default loadingReducer;