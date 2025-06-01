import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/NotFound.css'; // Buat file styling ini

function NotFound() {
  return (
    <div className="not-found-container">
      <h2>404 - Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
      <Link to="/" className="button">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;
