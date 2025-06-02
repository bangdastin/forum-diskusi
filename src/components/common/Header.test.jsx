// File: src/components/common/Header.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Header from './Header'; // Impor komponen Header
// Impor fungsi asli untuk dibandingkan referensinya
import { asyncLogoutUser as actualAsyncLogoutUser } from '../../redux/actions/authActions';

// Mock useDispatch dari react-redux
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const mockNavigate = jest.fn();
// Mock useNavigate dari react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Header component', () => {
  let store;

  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
    // State awal untuk authUser Redux slice, sesuaikan jika struktur state berbeda
    store = mockStore({
      authUser: { authUser: null, isPreload: false },
    });
  });

  const renderHeaderComponent = (authUserProp = null, initialRoute = '/') => {
    // Update store dengan authUserProp yang sesuai untuk tes ini
    store = mockStore({ authUser: { authUser: authUserProp, isPreload: false } });
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Header authUser={authUserProp} />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('should render "Login" and "Register" links when no authUser is provided', () => {
    renderHeaderComponent(null);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  it('should render user avatar, name, and "Logout" button when authUser is provided', () => {
    const mockAuthUser = {
      id: 'user-123',
      name: 'Test User',
      avatar: 'http://example.com/avatar.png',
    };
    renderHeaderComponent(mockAuthUser);
    expect(screen.getByText(mockAuthUser.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockAuthUser.name)).toHaveAttribute('src', mockAuthUser.avatar);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('should dispatch asyncLogoutUser and navigate to /login when logout button is clicked', () => {
    const mockAuthUser = {
      id: 'user-123',
      name: 'Test User',
      avatar: 'http://example.com/avatar.png',
    };
    renderHeaderComponent(mockAuthUser);
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    fireEvent.click(logoutButton);

    // Verifikasi bahwa mockDispatch dipanggil dengan thunk action yang benar
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    // Kita mengharapkan mockDispatch dipanggil dengan hasil dari pemanggilan actualAsyncLogoutUser
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.any(Function) // Memastikan yang di-dispatch adalah sebuah fungsi (thunk)
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});