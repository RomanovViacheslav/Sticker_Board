import { createSlice } from '@reduxjs/toolkit';

type loginStateType = {
  isLoading: boolean;
  isAuth: boolean;
  error: string;
};

const initialState: loginStateType = {
  isLoading: false,
  isAuth: false,
  error: '',
};

// export const register = createAsyncThunk('auth/login', async () => {});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginPending(state) {
      state.isLoading = true;
    },
    loginSuccess(state) {
      state.isLoading = false;
      state.isAuth = true;
      state.error = '';
    },
    loginFail(state, { payload }) {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload;
    },
    loginOut(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { loginPending, loginSuccess, loginFail, loginOut } = loginSlice.actions;

export default loginSlice.reducer;
