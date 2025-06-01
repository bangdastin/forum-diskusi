import { createSlice } from '@reduxjs/toolkit';

const leaderboardSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    receiveLeaderboardsActionCreator: (state, action) => action.payload,
  },
});

export const { receiveLeaderboardsActionCreator } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
