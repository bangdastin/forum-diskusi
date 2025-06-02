import leaderboardReducer, { receiveLeaderboardsActionCreator } from './leaderboardReducer';

/**
 * Test Scenario for leaderboardReducer
 *
 * - leaderboardReducer function
 * - should return the initial state (empty array) when given an unknown action
 * - should handle RECEIVE_LEADERBOARDS action correctly
 */
describe('leaderboardReducer function', () => {
  const initialState = [];

  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle RECEIVE_LEADERBOARDS action correctly', () => {
    // Arrange
    const leaderboardsData = [
      { user: { id: 'user-1', name: 'User A' }, score: 100 },
      { user: { id: 'user-2', name: 'User B' }, score: 90 },
    ];
    const action = receiveLeaderboardsActionCreator(leaderboardsData);

    // Act
    const nextState = leaderboardReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(leaderboardsData);
  });
});