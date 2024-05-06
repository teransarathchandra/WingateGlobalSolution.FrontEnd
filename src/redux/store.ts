import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // import your root reducer

const store = configureStore({
  reducer: rootReducer,
});
export default store;