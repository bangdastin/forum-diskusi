import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import '../styles/auth-pages.css';

function RegisterPage() {
  return (
    <div className="auth-page">
      <RegisterForm />
      <p>
        Sudah punya akun?
        {' '}
        <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
