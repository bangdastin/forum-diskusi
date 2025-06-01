import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../../redux/actions/threadsActions';
import '../../styles/forms.css';

function ThreadInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const onCreateThread = (event) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert('Judul dan isi thread tidak boleh kosong!');
      return;
    }
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/'); // Kembali ke homepage setelah thread dibuat
  };

  return (
    <form className="form-card" onSubmit={onCreateThread}>
      <h2>Buat Thread Baru</h2>
      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Thread"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Kategori (Opsional)</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. JavaScript, React, Umum"
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Isi Thread</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Apa yang ingin Anda diskusikan?"
          rows="10"
          required
        />
      </div>
      <button type="submit" className="button-primary">
        Buat Thread
      </button>
    </form>
  );
}

export default ThreadInput;
