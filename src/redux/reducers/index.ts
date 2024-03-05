import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import stepReducer from './stepReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    step: stepReducer,
});

export default rootReducer;