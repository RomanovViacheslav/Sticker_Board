import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice/loginSlice';
import userReducer from './userSlice/userSlice';
import regReducer from './regSlice/regSlice';
import adsReduser from './adsSlice/adsSlice';
import createAdReducer from './createAd/createAdSlice';
import adOneReducer from './adOneSlice/adOneSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    registration: regReducer,
    ads: adsReduser,
    createAd: createAdReducer,
    adOne: adOneReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
