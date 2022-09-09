import { createSlice } from '@reduxjs/toolkit';

type adsPablicStateType = {
  adsPublic: any[];

  error: string;
};

const initialState: adsPablicStateType = {
  adsPublic: [],

  error: '',
};

const adsPublicSlice = createSlice({
  name: 'adsPublic',
  initialState,
  reducers: {
    adsPublicSuccess: (state, { payload }) => {
      state.adsPublic = payload;
      state.error = '';
    },
    getAdsPublicFail: (state, { payload }) => {
      state.error = payload;
    },
    adsPublicClear: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { adsPublicSuccess, getAdsPublicFail, adsPublicClear } = adsPublicSlice.actions;

export default adsPublicSlice.reducer;
