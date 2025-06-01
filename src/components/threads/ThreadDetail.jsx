import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../../utils/helpers';
import VoteButtons from '../votes/VoteButtons';
import '../../styles/detail-thread.css';

/**
 * Komponen ThreadDetail menampilkan detail lengkap dari sebuah thread,
 * termasuk judul, isi, kategori, informasi pemilik, dan tombol voting.
 * Ini juga bertanggung jawab untuk menampilkan komentar terkait thread tersebut.
 */
function ThreadDetail({ detailThread, authUser, onUpVote, onDownVote, onNeutralVote }) {
  // Jika detailThread tidak ada (misalnya, masih loading atau tidak ditemukan),
  // komponen tidak akan merender apa-apa.
  if (!detailThread) {
    return null;
  }

  // Destrukturisasi properti yang diperlukan dari objek detailThread.
  const {
    id,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    // comments, // Variabel 'comments' tidak dideklarasikan di sini,
    // jadi peringatan 'no-unused-vars' tidak berlaku untuk file ini.
  } = detailThread;

  // Menentukan apakah pengguna saat ini sudah melakukan upvote atau downvote.
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  return (
    <div className="thread-detail-card rounded-lg shadow-md p-6 bg-white max-w-3xl mx-auto my-8">
      {/* Bagian header thread: kategori, judul, dan meta informasi pemilik */}
      <div className="thread-detail-header mb-4">
        <span className="thread-detail-category inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          {`#${category}`}
        </span>
        <h2 className="thread-detail-title text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <div className="thread-detail-meta text-sm text-gray-600 flex items-center space-x-2">
          <img
            src={owner.avatar || 'https://placehold.co/32x32/cccccc/ffffff?text=AV'} // Fallback avatar
            alt={owner.name}
            className="avatar-small w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/32x32/cccccc/ffffff?text=AV';
            }} // Fallback on error
          />
          <span>
            {owner.name}
          </span>
          <span className="dot-separator">·</span>
          <span>
            {postedAt(createdAt)}
          </span>
        </div>
      </div>

      {/* Bagian isi thread. Menggunakan dangerouslySetInnerHTML. */}
      {/* PERINGATAN: Penggunaan dangerouslySetInnerHTML dapat menimbulkan risiko XSS
          jika konten 'body' tidak disanitasi dengan benar. Pastikan 'body' bersih
          dari script berbahaya jika berasal dari input pengguna. */}
      <div
        className="thread-detail-body prose prose-lg max-w-none text-gray-800 mb-6"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {/* Tombol aksi voting untuk thread ini */}
      <div className="thread-detail-actions flex items-center space-x-4">
        <VoteButtons
          id={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUser={authUser}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
          type="thread"
        />
      </div>
    </div>
  );
}

// Definisi PropTypes untuk validasi prop yang diterima komponen ThreadDetail.
ThreadDetail.propTypes = {
  // Objek detailThread harus memiliki bentuk tertentu dan bersifat wajib.
  detailThread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    // Objek owner juga harus memiliki bentuk tertentu dan bersifat wajib.
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string, // Avatar bisa opsional atau string URL
    }).isRequired,
    // upVotesBy dan downVotesBy adalah array of string (ID pengguna).
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    // comments adalah array of object. Kita mendefinisikan bentuk objek komentar
    // untuk menghindari peringatan 'Prop type "object" is forbidden'.
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        owner: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string,
        }).isRequired,
        upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
        downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
    ).isRequired,
    // totalComments mungkin juga ada di detailThread, jika perlu ditambahkan:
    // totalComments: PropTypes.number.isRequired,
  }),
  // Objek authUser (pengguna yang sedang login) bisa null jika tidak login.
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  // Fungsi callback untuk voting.
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
};

// Nilai default untuk prop yang bersifat opsional.
ThreadDetail.defaultProps = {
  detailThread: null,
  authUser: null,
};

export default ThreadDetail;
