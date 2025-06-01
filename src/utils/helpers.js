const ACCESS_TOKEN_KEY = 'accessToken';

function putAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari yang lalu`;
  }
  if (diffHours > 0) {
    return `${diffHours} jam yang lalu`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit yang lalu`;
  }
  return `${diffSeconds} detik yang lalu`;
}

// Fungsi untuk mendapatkan kategori unik dari semua thread
function getUniqueCategories(threads) {
  const categories = threads.map((thread) => thread.category).filter(Boolean); // Filter undefined/null
  return [...new Set(categories)]; // Menggunakan Set untuk mendapatkan nilai unik
}

export {
  putAccessToken, getAccessToken, clearAccessToken, postedAt, getUniqueCategories,
};
