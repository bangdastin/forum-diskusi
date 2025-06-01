import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailThreadPage from './pages/DetailThreadPage';
import NewThreadPage from './pages/NewThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFound from './components/common/NotFound';
import Header from './components/common/Header';
import LoadingBar from './components/common/LoadingBar';
import { asyncPreloadProcess } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();
  // Mengambil authUser dan status preload dari Redux store
  const { authUser, isPreload } = useSelector((state) => state.authUser);
  // Mengambil status loading dari Redux store
  const { loading } = useSelector((state) => state.loadingBar);

  // Efek samping untuk proses preload saat aplikasi dimuat
  useEffect(() => {
    console.log('🚀 Preload triggered');
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // Tampilkan null atau splash screen selama proses preload
  if (isPreload) {
    return <div className="splash-screen">Loading...</div>;
  }

  return (
    <>
      <Header authUser={authUser} />
      {/* Menampilkan Loading Bar jika ada proses loading */}
      {loading && <LoadingBar />}
      <main className="container">
        <Routes>
          {authUser === null ? (
            // Rute yang dapat diakses oleh pengguna yang belum login
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<LoginPage />} />
              {/* Jika belum login, defaultnya ke halaman login */}
            </>
          ) : (
            // Rute yang dapat diakses oleh pengguna yang sudah login
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<DetailThreadPage />} />
              <Route path="/new" element={<NewThreadPage />} />
              <Route path="/leaderboards" element={<LeaderboardPage />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
