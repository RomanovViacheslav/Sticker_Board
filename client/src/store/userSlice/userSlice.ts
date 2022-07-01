import { createSlice } from '@reduxjs/toolkit';

type userStateType = {
  user: {};
  isLoading: boolean;
  error: string;
  isUser: boolean;
};

const initialState: userStateType = {
  user: {},
  isLoading: false,
  error: '',
  isUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = '';
      state.isUser = true;
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    userClear: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { getUserPending, getUserSuccess, getUserFail, userClear } = userSlice.actions;

export default userSlice.reducer;
