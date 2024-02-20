import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
});

export default rootReducer;