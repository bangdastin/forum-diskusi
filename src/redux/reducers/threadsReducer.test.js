import threadsReducer, {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
} from './threadsReducer';

/**
 * Test Scenario for threadsReducer
 *
 * - threadsReducer function
 * - should return the initial state when given by unknown action
 * - should handle RECEIVE_THREADS action correctly
 * - should handle ADD_THREAD action correctly by adding new thread to the top
 * - should handle UP_VOTE_THREAD action correctly for a thread in the list
 */
describe('threadsReducer function', () => {
  const initialState = { list: [], detail: null };

  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle RECEIVE_THREADS action correctly', () => {
    // Arrange
    const threads = [{ id: 'thread-1', title: 'Thread 1' }];
    const action = receiveThreadsActionCreator(threads);

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState.list).toEqual(threads);
  });

  it('should handle ADD_THREAD action correctly by adding new thread to the top', () => {
    // Arrange
    const existingThreads = [{ id: 'thread-1', title: 'Thread 1' }];
    const newThread = { id: 'thread-2', title: 'New Thread' };
    const currentState = { ...initialState, list: existingThreads };
    const action = addThreadActionCreator(newThread);

    // Act
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState.list).toEqual([newThread, ...existingThreads]);
  });

  it('should handle UP_VOTE_THREAD action correctly for a thread in the list', () => {
    // Arrange
    const threadToUpVote = {
      id: 'thread-1',
      title: 'Thread to Upvote',
      upVotesBy: [],
      downVotesBy: ['user-2'],
    };
    const otherThread = { id: 'thread-2', title: 'Other Thread', upVotesBy: [], downVotesBy: [] };
    const currentState = { ...initialState, list: [threadToUpVote, otherThread] };
    const userId = 'user-1';
    const action = upVoteThreadActionCreator({ threadId: threadToUpVote.id, userId });

    // Act
    const nextState = threadsReducer(currentState, action);
    const updatedThread = nextState.list.find((t) => t.id === threadToUpVote.id);

    // Assert
    expect(updatedThread.upVotesBy).toContain(userId);
    expect(updatedThread.downVotesBy).not.toContain(userId);
  });
});