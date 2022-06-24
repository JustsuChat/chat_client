import { configureStore } from '@reduxjs/toolkit';
import login from '../features/Login/loginSlice';
import global from './globalSlice';

const rootReducer = {
  global,
  login,

};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
