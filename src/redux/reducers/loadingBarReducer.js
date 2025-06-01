import { createSlice } from '@reduxjs/toolkit';

const loadingBarSlice = createSlice({
  name: 'loadingBar',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  showLoading, hideLoading,
} = loadingBarSlice.actions;
export default loadingBarSlice.reducer;
