import {
  getAccessToken, putAccessToken, clearAccessToken,
} from '../utils/helpers'; // Perbaikan import

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (response.status === 401) {
      // Jika token tidak valid atau expired, hapus token dan redirect ke login
      clearAccessToken();
      // window.location.href = '/login'; // Atau gunakan navigate dari react-router-dom
      throw new Error('Unauthorized. Please login again.');
    }

    return response;
  }

  async function register({
    name, email, password,
  }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function login({
    email, password,
  }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.threads;
  }

  async function getDetailThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.detailThread;
  }

  async function createThread({
    title, body, category = '',
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.thread;
  }

  async function createComment({
    threadId, content,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.comment;
  }

  async function upVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    const {
      status, message,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function downVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    const {
      status, message,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function neutralVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    const {
      status, message,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function upVoteComment({
    threadId, commentId,
  }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    const {
      status, message,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function downVoteComment({
    threadId, commentId,
  }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    const {
      status, message,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function neutralVoteComment({
    threadId, commentId,
  }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    const {
      status, message,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const {
      status, message, data,
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.leaderboards;
  }

  return {
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getDetailThread,
    createThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
    putAccessToken,
    clearAccessToken,
  };
})();

export default api;
