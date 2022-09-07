import { createSlice } from '@reduxjs/toolkit';

type adOneStateType = {
  ad: {};
  isLoading: boolean;
  error: string;
  isAd: boolean;
};

const initialState: adOneStateType = {
  ad: {},
  isLoading: false,
  error: '',
  isAd: false,
};

const adOneSlice = createSlice({
  name: 'adOne',
  initialState,
  reducers: {
    getAdOnePending: (state) => {
      state.isLoading = true;
    },
    getAdOneSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.ad = payload;
      state.error = '';
      state.isAd = true;
    },
    getAdOneFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    adOneClear: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { getAdOnePending, getAdOneSuccess, getAdOneFail, adOneClear } = adOneSlice.actions;

export default adOneSlice.reducer;
