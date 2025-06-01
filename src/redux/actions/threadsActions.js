import {
  showLoading, hideLoading,
} from '../reducers/loadingBarReducer';
import { receiveUsersActionCreator } from '../reducers/usersReducer'; // Pastikan ini diimport
import {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
} from '../reducers/threadsReducer';
import api from '../../api';

// Action untuk mendapatkan semua thread dan semua user
function asyncReceiveThreadsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      const users = await api.getAllUsers(); // Ambil semua user

      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users)); // Dispatch action untuk user
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Action untuk membuat thread baru
function asyncAddThread({
  title, body, category,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      alert('Thread berhasil dibuat!');
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Action untuk mendapatkan detail thread
function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator()); // Bersihkan detail sebelumnya
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Action untuk membuat komentar
function asyncAddComment({
  threadId, content,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Action untuk upvote thread (dengan optimistik update)
function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState().authUser;
    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id })); // Optimistic update
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id })); // Rollback jika gagal
    }
  };
}

// Action untuk downvote thread (dengan optimistik update)
function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState().authUser;
    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id })); // Optimistic update
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id })); // Rollback jika gagal
    }
  };
}

// Action untuk neutral vote thread (dengan optimistik update)
function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState().authUser;
    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id })); // Optimistic update
    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      // Jika terjadi error, kita tidak tahu state vote sebelumnya,
      // jadi mungkin perlu refresh atau logic rollback yang lebih kompleks.
      // Untuk tujuan demo, biarkan saja.
    }
  };
}

// Action untuk upvote komentar (dengan optimistik update)
function asyncUpVoteComment({
  threadId, commentId,
}) {
  return async (dispatch, getState) => {
    const { authUser } = getState().authUser;
    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }
    dispatch(upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })); // Optimistic update
    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })); // Rollback jika gagal
    }
  };
}

// Action untuk downvote komentar (dengan optimistik update)
function asyncDownVoteComment({
  threadId, commentId,
}) {
  return async (dispatch, getState) => {
    const { authUser } = getState().authUser;
    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }
    dispatch(downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })); // Optimistic update
    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })); // Rollback jika gagal
    }
  };
}

// Action untuk neutral vote komentar (dengan optimistik update)
function asyncNeutralVoteComment({
  threadId, commentId,
}) {
  return async (dispatch, getState) => {
    const { authUser } = getState().authUser;
    if (!authUser) {
      alert('Anda harus login untuk vote!');
      return;
    }
    dispatch(neutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })); // Optimistic update
    try {
      await api.neutralVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      // Rollback jika gagal (mirip dengan neutral vote thread)
    }
  };
}

export {
  asyncReceiveThreadsAndUsers,
  asyncAddThread,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};
