import { hideLoading, showLoading } from '../reducers/loadingBarReducer';
import { setAuthUser } from '../reducers/authReducer';
import api from '../../api';
import { asyncLoginUser } from './authActions';

/**
 * Test scenario for asyncLoginUser thunk
 *
 * - asyncLoginUser thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch action and call alert when data fetching failed
 */

// Mock API
const fakeToken = 'fake-token-123';
const fakeUserProfile = { id: 'user-1', name: 'Test User', email: 'test@example.com' };
const fakeError = new Error('Login failed');

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('asyncLoginUser thunk', () => {
  // Backup original API and alert
  const originalApiLogin = api.login;
  const originalApiGetOwnProfile = api.getOwnProfile;
  const originalAlert = window.alert;

  beforeEach(() => {
    // Mock API functions
    api.login = jest.fn();
    api.getOwnProfile = jest.fn();
    // Mock window.alert
    window.alert = jest.fn();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Restore original API and alert
    api.login = originalApiLogin;
    api.getOwnProfile = originalApiGetOwnProfile;
    window.alert = originalAlert;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // Stub successful API calls
    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUserProfile);

    // Mock dispatch
    const dispatch = jest.fn();

    // Act
    await asyncLoginUser({ email: 'test@example.com', password: 'password' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(localStorage.getItem('accessToken')).toBe(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUserProfile));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching failed', async () => {
    // Arrange
    // Stub failed API call
    api.login.mockRejectedValue(fakeError);

    // Mock dispatch
    const dispatch = jest.fn();

    // Act
    await asyncLoginUser({ email: 'test@example.com', password: 'password' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});