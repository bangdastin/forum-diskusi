import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import '../styles/auth-pages.css';

function LoginPage() {
  return (
    <div className="auth-page">
      <LoginForm />
      <p>
        Belum punya akun?
        {' '}
        <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default LoginPage;
