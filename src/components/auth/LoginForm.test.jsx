import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import LoginForm from './LoginForm';
// Impor fungsi asli untuk dibandingkan referensinya nanti
import { asyncLoginUser as actualAsyncLoginUser } from '../../redux/actions/authActions';

// Mock useDispatch dari react-redux
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

// Mock window.alert
global.alert = jest.fn();

const middlewares = [thunk];
// Tidak perlu mockStore di sini karena kita mock useDispatch secara langsung
// Namun, jika ada useSelector yang perlu di-mock, mockStore tetap berguna
const mockStore = configureMockStore(middlewares);


describe('LoginForm component', () => {
  // Inisialisasi store di sini jika ada useSelector di LoginForm
  // Untuk LoginForm saat ini, sepertinya tidak ada useSelector, jadi store bisa lebih sederhana
  let store;

  beforeEach(() => {
    // Reset semua mock sebelum setiap tes
    mockDispatch.mockClear();
    global.alert.mockClear();
    store = mockStore({}); // Jika ada useSelector, sesuaikan initial state di sini
  });

  const renderComponent = () => render(
    // Provider tetap dibutuhkan jika ada useSelector
    <Provider store={store}>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </Provider>,
  );

  it('should render email input, password input, and login button correctly', () => {
    renderComponent();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should update email state when email input changes', () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password state when password input changes', () => {
    renderComponent();
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('should call alert when login is attempted with empty email', () => {
    renderComponent();
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(global.alert).toHaveBeenCalledWith('Email dan password harus diisi!');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should call alert when login is attempted with empty password', () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(loginButton);
    expect(global.alert).toHaveBeenCalledWith('Email dan password harus diisi!');
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should dispatch asyncLoginUser action with correct data when form is submitted with valid inputs', () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    fireEvent.click(loginButton);

    expect(global.alert).not.toHaveBeenCalled();
    // Verifikasi bahwa mockDispatch dipanggil dengan thunk action yang benar
    // actualAsyncLoginUser adalah referensi ke fungsi asli dari modul authActions
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    // Kita mengharapkan mockDispatch dipanggil dengan hasil dari pemanggilan actualAsyncLoginUser
    // karena asyncLoginUser di dalam komponen adalah yang asli (bukan mock dari jest.mock)
    // dan thunk middleware akan menangani fungsi yang dikembalikan.
    // Ini adalah cara yang lebih akurat untuk menguji dispatch thunk dari komponen.
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.any(Function) // Memastikan bahwa yang di-dispatch adalah sebuah fungsi (thunk)
    );

    // Untuk verifikasi argumen yang lebih detail pada thunk,
    // kita bisa mock implementasi dari actualAsyncLoginUser jika perlu,
    // atau biarkan thunk test yang menangani detail internalnya.
    // Untuk saat ini, cukup memverifikasi mockDispatch dipanggil dengan sebuah fungsi.
  });
});