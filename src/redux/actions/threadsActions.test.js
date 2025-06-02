import { hideLoading, showLoading } from '../reducers/loadingBarReducer';
import { receiveUsersActionCreator } from '../reducers/usersReducer';
import { receiveThreadsActionCreator } // Tambahkan jika belum ada
  from '../reducers/threadsReducer';
import api from '../../api';
import { asyncReceiveThreadsAndUsers } from './threadsActions';

/**
 * Test scenario for asyncReceiveThreadsAndUsers thunk
 *
 * - asyncReceiveThreadsAndUsers thunk
 * - should dispatch actions correctly when data fetching success
 * - should dispatch action and call alert when data fetching failed
 */

const fakeThreads = [{ id: 'thread-1', title: 'Thread 1' }];
const fakeUsers = [{ id: 'user-1', name: 'User 1' }];
const fakeError = new Error('Failed to fetch data');

describe('asyncReceiveThreadsAndUsers thunk', () => {
  const originalApiGetAllThreads = api.getAllThreads;
  const originalApiGetAllUsers = api.getAllUsers;
  const originalAlert = window.alert;

  beforeEach(() => {
    api.getAllThreads = jest.fn();
    api.getAllUsers = jest.fn();
    window.alert = jest.fn();
  });

  afterEach(() => {
    api.getAllThreads = originalApiGetAllThreads;
    api.getAllUsers = originalApiGetAllUsers;
    window.alert = originalAlert;
  });

  it('should dispatch actions correctly when data fetching success', async () => {
    // Arrange
    api.getAllThreads.mockResolvedValue(fakeThreads);
    api.getAllUsers.mockResolvedValue(fakeUsers);
    const dispatch = jest.fn();

    // Act
    await asyncReceiveThreadsAndUsers()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching failed', async () => {
    // Arrange
    api.getAllThreads.mockRejectedValue(fakeError);
    // Tidak perlu mock getAllUsers jika getAllThreads sudah error
    const dispatch = jest.fn();

    // Act
    await asyncReceiveThreadsAndUsers()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});