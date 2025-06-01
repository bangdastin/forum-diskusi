import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './reducers/authReducer';
import threadsReducer from './reducers/threadsReducer';
import usersReducer from './reducers/usersReducer';
import leaderboardReducer from './reducers/leaderboardReducer';
import loadingBarReducer from './reducers/loadingBarReducer'; // Untuk indikator loading

const store = configureStore({
  reducer: {
    authUser: authUserReducer, // State untuk user yang sedang login
    threads: threadsReducer, // State untuk daftar thread dan detail thread
    users: usersReducer, // State untuk semua user (digunakan di leaderboard dan thread)
    leaderboards: leaderboardReducer, // State untuk data leaderboard
    loadingBar: loadingBarReducer, // State untuk menampilkan/menyembunyikan loading bar
  },
});

export default store;
