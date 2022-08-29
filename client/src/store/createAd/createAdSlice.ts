import { createSlice } from '@reduxjs/toolkit';

type CreateAdStateType = {
  isLoading: boolean;
  status: string;
  message: string;
};

const initialState: CreateAdStateType = {
  isLoading: false,
  status: '',
  message: '',
};

const createAdSlice = createSlice({
  name: 'createAd',
  initialState,
  reducers: {
    createAdPending: (state) => {
      state.isLoading = true;
    },
    createAdSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = 'success';
      state.message = payload;
    },
    createAdError: (state, { payload }) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = payload;
    },
  },
});

export const { createAdPending, createAdSuccess, createAdError } = createAdSlice.actions;

export default createAdSlice.reducer;
