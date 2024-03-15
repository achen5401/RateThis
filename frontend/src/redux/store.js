import { combineReducers } from 'redux';
import modalReducer from './reducers/modalReducer';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import storeReducer from './reducers/storeReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  store: storeReducer,
  // Add other reducers if needed
});

const store = configureStore({
  reducer: rootReducer,
  // Additional middleware or setup can be added here
});

export default store;