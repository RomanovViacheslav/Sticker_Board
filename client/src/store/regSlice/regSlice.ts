import { createSlice } from '@reduxjs/toolkit';

type RegStateType = {
  isLoading: boolean;
  status: string;
  message: string;
};

const initialState: RegStateType = {
  isLoading: false,
  status: '',
  message: '',
};

const regSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {
    regPending: (state) => {
      state.isLoading = true;
    },
    regSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = 'success';
      state.message = payload;
    },
    regError: (state, { payload }) => {
      state.isLoading = false;
      state.status = 'error';
      state.message = payload;
    },
  },
});

export const { regPending, regSuccess, regError } = regSlice.actions;

export default regSlice.reducer;
