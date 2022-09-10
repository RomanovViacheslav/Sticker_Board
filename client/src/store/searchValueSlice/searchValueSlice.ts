import { createSlice } from '@reduxjs/toolkit';

type SearchStateType = {
  value: string;
};

const initialState: SearchStateType = {
  value: '',
};

const searchValueSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getValue: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { getValue } = searchValueSlice.actions;

export default searchValueSlice.reducer;
