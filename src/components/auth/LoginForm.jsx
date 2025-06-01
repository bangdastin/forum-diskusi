import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncLoginUser } from '../../redux/actions/authActions';
import '../../styles/forms.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('Email dan password harus diisi!');
      return;
    }
    dispatch(asyncLoginUser({ email, password }));
  };

  return (
    <form className="form-card" onSubmit={onLogin}>
      <h2>Login</h2>
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
        Login
      </button>
    </form>
  );
}

export default LoginForm;
