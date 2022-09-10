import { createSlice } from '@reduxjs/toolkit';

type adsPablicStateType = {
  adsPublic: any[];
  isLoading: boolean;
  error: string;
};

const initialState: adsPablicStateType = {
  adsPublic: [],
  isLoading: false,
  error: '',
};

const adsPublicSlice = createSlice({
  name: 'adsPublic',
  initialState,
  reducers: {
    getAdsPublicPending: (state) => {
      state.isLoading = true;
    },
    adsPublicSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.adsPublic = payload;
      state.error = '';
    },
    getAdsPublicFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    adsPublicClear: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// eslint-disable-next-line operator-linebreak
export const { adsPublicSuccess, getAdsPublicFail, adsPublicClear, getAdsPublicPending } =
  adsPublicSlice.actions;

export default adsPublicSlice.reducer;
