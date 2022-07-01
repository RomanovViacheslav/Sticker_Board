import { configureStore } from '@reduxjs/toolkit';
import { registration } from '../network/user';
import loginReducer from './loginSlice/loginSlice';
import userReducer from './userSlice/userSlice';
import regReducer from './regSlice/regSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    registration: regReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
