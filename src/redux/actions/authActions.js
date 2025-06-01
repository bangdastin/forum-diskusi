import {
  setAuthUser, unsetAuthUser, setIsPreload,
} from '../reducers/authReducer';
import {
  showLoading, hideLoading,
} from '../reducers/loadingBarReducer';
import { receiveUsersActionCreator } from '../reducers/usersReducer'; // Import action untuk users
import api from '../../api';
import {
  putAccessToken, clearAccessToken,
} from '../../utils/helpers';

function asyncRegisterUser({
  name, email, password,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      alert('Registrasi berhasil! Silakan login.');
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncLoginUser({
  email, password,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      putAccessToken(token); // Simpan token di local storage
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncLogoutUser() {
  return (dispatch) => {
    dispatch(unsetAuthUser());
    clearAccessToken(); // Hapus token dari local storage
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      // Ambil data user yang sedang login
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));

      // Ambil semua user untuk kebutuhan avatar, dll.
      const users = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users)); // Menggunakan action creator dari user reducer
    } catch (error) {
      // Jika terjadi error (misal: token tidak valid), set authUser menjadi null
      dispatch(setAuthUser(null));
      clearAccessToken(); // Pastikan token dihapus
    } finally {
      dispatch(setIsPreload(false)); // Tandai bahwa proses preload selesai
      dispatch(hideLoading());
    }
  };
}

export {
  asyncRegisterUser, asyncLoginUser, asyncLogoutUser, asyncPreloadProcess,
};
