import { createSlice } from '@reduxjs/toolkit';

type adsStateType = {
  ads: any[];
};

const initialState:adsStateType = {
  ads: [],
};

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    getAdsPending: (state) => {},
    getAdsSuccess: (state, { payload }) => {
      state.ads = payload;
    },
    getAdsFilter: (state, { payload }) => {
      state.ads = payload;
    },
    adsClear: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { getAdsSuccess, getAdsFilter, adsClear } = adsSlice.actions;

export default adsSlice.reducer;
