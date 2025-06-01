import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authUser',
  initialState: {
    authUser: null,
    isPreload: true,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    unsetAuthUser: (state) => {
      state.authUser = null;
    },
    setIsPreload: (state, action) => {
      state.isPreload = action.payload;
    },
  },
});

export const {
  setAuthUser, unsetAuthUser, setIsPreload,
} = authSlice.actions;
export default authSlice.reducer;
