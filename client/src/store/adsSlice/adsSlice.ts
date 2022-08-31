import { createSlice } from '@reduxjs/toolkit';

type adsStateType = {
  ads: any[];
  filterAds: any[];
  isLoading: boolean;
  error: string;
};

const initialState: adsStateType = {
  ads: [],
  filterAds: [],
  isLoading: false,
  error: '',
};

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    getAdsPending: (state) => {
      state.isLoading = true;
    },
    getAdsSuccess: (state, { payload }) => {
      state.ads = payload;
      state.isLoading = false;
      state.error = '';
    },
    getAdsFilter: (state, { payload }) => {
      state.filterAds = payload;
      state.isLoading = false;
    },
    getAdsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    adsClear: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// eslint-disable-next-line operator-linebreak
export const { getAdsPending, getAdsSuccess, getAdsFilter, getAdsFail, adsClear } =
  adsSlice.actions;

export default adsSlice.reducer;
