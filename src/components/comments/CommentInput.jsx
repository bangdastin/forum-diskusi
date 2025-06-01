import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { asyncAddComment } from '../../redux/actions/threadsActions';
import '../../styles/forms.css';

function CommentInput({ threadId }) {
  const dispatch = useDispatch();
  const [commentContent, setCommentContent] = useState('');

  const onAddComment = (event) => {
    event.preventDefault();
    if (!commentContent.trim()) {
      alert('Komentar tidak boleh kosong!');
      return;
    }
    dispatch(asyncAddComment({ threadId, content: commentContent }));
    setCommentContent(''); // Bersihkan input setelah komentar dibuat
  };

  return (
    <form className="comment-input-form" onSubmit={onAddComment}>
      <h3>Tambahkan Komentar</h3>
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Tulis komentar Anda..."
        rows="4"
        required
      />
      <button type="submit" className="button-primary">
        Kirim Komentar
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
