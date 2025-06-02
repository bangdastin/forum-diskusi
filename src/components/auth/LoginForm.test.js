import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginForm from './LoginForm'; // Pastikan path ini benar
import { asyncLoginUser } from '../../redux/actions/authActions';

/**
 * Test Scenario for LoginForm Component
 *
 * - LoginForm component
 * - should handle email typing correctly
 * - should handle password typing correctly
 * - should call login function when login button is clicked
 * - should show alert if email or password is empty when login button is clicked
 */

const mockStore = configureStore([thunk]);

// Mocking the asyncLoginUser action
jest.mock('../../redux/actions/authActions', () => ({
  ...jest.requireActual('../../redux/actions/authActions'),
  asyncLoginUser: jest.fn(() => ({ type: 'MOCKED_LOGIN_ACTION' })),
}));

// Mock window.alert
const mockAlert = jest.fn();
global.alert = mockAlert;

describe('LoginForm component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn(); // Mock dispatch for the store instance
    mockAlert.mockClear(); // Clear alert mock for each test
    asyncLoginUser.mockClear(); // Clear the mock for asyncLoginUser
  });

  it('should handle email typing correctly', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email');

    // Act
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Assert
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');

    // Act
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call login function when login button is clicked with valid data', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Act
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Assert
    // Check if asyncLoginUser was called with the correct parameters
    expect(asyncLoginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    // Check if dispatch was called with the result of asyncLoginUser
    expect(store.dispatch).toHaveBeenCalledWith(asyncLoginUser({
      email: 'test@example.com',
      password: 'password123',
    }));
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('should show alert if email is empty when login button is clicked', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Act
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton); // Submit with empty email

    // Assert
    expect(mockAlert).toHaveBeenCalledWith('Email dan password harus diisi!');
    expect(store.dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'MOCKED_LOGIN_ACTION' }));
  });

  it('should show alert if password is empty when login button is clicked', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Act
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(loginButton); // Submit with empty password

    // Assert
    expect(mockAlert).toHaveBeenCalledWith('Email dan password harus diisi!');
    expect(store.dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'MOCKED_LOGIN_ACTION' }));
  });
});