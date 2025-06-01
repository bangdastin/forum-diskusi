import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../../redux/actions/authActions';
import '../../styles/forms.css';

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      alert('Nama, email, dan password harus diisi!');
      return;
    }
    if (password.length < 6) {
      alert('Password minimal 6 karakter!');
      return;
    }
    await dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login'); // Redirect ke halaman login setelah registrasi berhasil
  };

  return (
    <form className="form-card" onSubmit={onRegister}>
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="button-primary">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
