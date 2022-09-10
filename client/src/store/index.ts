import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice/loginSlice';
import userReducer from './userSlice/userSlice';
import regReducer from './regSlice/regSlice';
import adsReduser from './adsSlice/adsSlice';
import createAdReducer from './createAd/createAdSlice';
import adOneReducer from './adOneSlice/adOneSlice';
import adsPublicReducer from './adsPublicSlice/adsPublicSlice';
import searchValueReducer from './searchValueSlice/searchValueSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    registration: regReducer,
    ads: adsReduser,
    createAd: createAdReducer,
    adOne: adOneReducer,
    adsPublic: adsPublicReducer,
    searchValue: searchValueReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
