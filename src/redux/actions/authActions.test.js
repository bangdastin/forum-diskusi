import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk'; // Correct import for redux-thunk v3
import api from '../../api'; // Assuming your API module is here
import {
  asyncLoginUser,
  asyncRegisterUser, // We'll test this one as well
  asyncPreloadProcess,
} from './authActions';
import { setAuthUser, setIsPreload } from '../reducers/authReducer';
import { showLoading, hideLoading } from '../reducers/loadingBarReducer';
import { receiveUsersActionCreator } from '../reducers/usersReducer';
import { putAccessToken, clearAccessToken } from '../../utils/helpers';

// Mock the API module
jest.mock('../../api');
// Mock the helpers
jest.mock('../../utils/helpers', () => ({
  putAccessToken: jest.fn(),
  getAccessToken: jest.fn(),
  clearAccessToken: jest.fn(),
}));
// Mock window.alert
global.alert = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Test Scenario for authActions Thunks
 *
 * - asyncLoginUser thunk
 * - should dispatch actions correctly when login is successful
 * - should call alert and dispatch actions correctly when login fails
 *
 * - asyncRegisterUser thunk
 * - should call alert and dispatch actions correctly when registration is successful
 * - should call alert and dispatch actions correctly when registration fails
 *
 * - asyncPreloadProcess thunk
 * - should dispatch actions correctly when preload is successful (user authenticated)
 * - should dispatch actions correctly when preload results in no authenticated user (e.g., token invalid)
 */
describe('authActions Thunks', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ authUser: { authUser: null, isPreload: true }, users: [] });
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('asyncLoginUser thunk', () => {
    it('should dispatch actions correctly when login is successful', async () => {
      // Arrange
      const fakeToken = 'fake-token';
      const fakeUser = { id: 'user-1', name: 'Test User' };
      api.login.mockResolvedValue(fakeToken);
      api.getOwnProfile.mockResolvedValue(fakeUser);

      const expectedActions = [
        showLoading(),
        setAuthUser(fakeUser),
        hideLoading(),
      ];

      // Act
      await store.dispatch(asyncLoginUser({ email: 'test@example.com', password: 'password' }));

      // Assert
      expect(putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(api.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
      expect(api.getOwnProfile).toHaveBeenCalled();
      const dispatchedActions = store.getActions();
      // console.log('Dispatched Actions (Login Success):', dispatchedActions);
      expect(dispatchedActions).toEqual(expectedActions);
    });

    it('should call alert and dispatch actions correctly when login fails', async () => {
      // Arrange
      const errorMessage = 'Login failed';
      api.login.mockRejectedValue(new Error(errorMessage));

      const expectedActions = [
        showLoading(),
        hideLoading(),
      ];

      // Act
      await store.dispatch(asyncLoginUser({ email: 'wrong@example.com', password: 'wrong' }));

      // Assert
      expect(global.alert).toHaveBeenCalledWith(errorMessage);
      const dispatchedActions = store.getActions();
      // console.log('Dispatched Actions (Login Fail):', dispatchedActions);
      expect(dispatchedActions).toEqual(expectedActions);
      expect(putAccessToken).not.toHaveBeenCalled();
    });
  });

  describe('asyncRegisterUser thunk', () => {
    it('should call alert and dispatch actions correctly when registration is successful', async () => {
      // Arrange
      const fakeUserData = { name: 'New User', email: 'new@example.com', password: 'password123' };
      api.register.mockResolvedValue({ status: 'success', data: { user: fakeUserData } }); // Assuming API returns this structure

      const expectedActions = [
        showLoading(),
        hideLoading(),
      ];

      // Act
      await store.dispatch(asyncRegisterUser(fakeUserData));

      // Assert
      expect(api.register).toHaveBeenCalledWith(fakeUserData);
      expect(global.alert).toHaveBeenCalledWith('Registrasi berhasil! Silakan login.');
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });

    it('should call alert and dispatch actions correctly when registration fails', async () => {
      // Arrange
      const errorMessage = 'Registration failed';
      api.register.mockRejectedValue(new Error(errorMessage));
      const fakeUserData = { name: 'New User', email: 'new@example.com', password: 'password123' };


      const expectedActions = [
        showLoading(),
        hideLoading(),
      ];

      // Act
      await store.dispatch(asyncRegisterUser(fakeUserData));

      // Assert
      expect(global.alert).toHaveBeenCalledWith(errorMessage);
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  describe('asyncPreloadProcess thunk', () => {
    it('should dispatch actions correctly when preload is successful (user authenticated)', async () => {
      // Arrange
      const fakeUser = { id: 'user-1', name: 'Preloaded User' };
      const fakeAllUsers = [{ id: 'user-1', name: 'Preloaded User' }, { id: 'user-2', name: 'Other User' }];
      api.getOwnProfile.mockResolvedValue(fakeUser);
      api.getAllUsers.mockResolvedValue(fakeAllUsers);

      const expectedActions = [
        showLoading(),
        setAuthUser(fakeUser),
        receiveUsersActionCreator(fakeAllUsers),
        setIsPreload(false),
        hideLoading(),
      ];

      // Act
      await store.dispatch(asyncPreloadProcess());

      // Assert
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
      expect(clearAccessToken).not.toHaveBeenCalled();
    });

    it('should dispatch actions correctly when preload results in no authenticated user', async () => {
      // Arrange
      api.getOwnProfile.mockRejectedValue(new Error('Unauthorized'));
      // getAllUsers might still be called or not, depending on your logic.
      // For this test, let's assume it won't be called if getOwnProfile fails.
      // If it is called, you might need to mock it too.

      const expectedActions = [
        showLoading(),
        setAuthUser(null), // Sets authUser to null on error
        // receiveUsersActionCreator might not be called or called with empty if API fails early
        setIsPreload(false),
        hideLoading(),
      ];

      // Act
      await store.dispatch(asyncPreloadProcess());

      // Assert
      const dispatchedActions = store.getActions();
      expect(clearAccessToken).toHaveBeenCalled();
      // We need to be a bit flexible here because the order of receiveUsersActionCreator might vary
      // or it might not be dispatched if getOwnProfile fails.
      // The crucial parts are setAuthUser(null), setIsPreload(false), and loading actions.
      expect(dispatchedActions).toContainEqual(showLoading());
      expect(dispatchedActions).toContainEqual(setAuthUser(null));
      expect(dispatchedActions).toContainEqual(setIsPreload(false));
      expect(dispatchedActions).toContainEqual(hideLoading());
    });
  });
});