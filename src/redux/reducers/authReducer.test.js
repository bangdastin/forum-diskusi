import authReducer, { setAuthUser, unsetAuthUser, setIsPreload } from './authReducer';

/**
 * Test Scenario for authUserReducer
 *
 * - authUserReducer function
 * - should return the initial state when given by unknown action
 * - should handle SET_AUTH_USER action correctly
 * - should handle UNSET_AUTH_USER action correctly
 * - should handle SET_IS_PRELOAD action correctly
 */
describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = { authUser: null, isPreload: true };
    const action = { type: 'UNKNOWN_ACTION' };

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle SET_AUTH_USER action correctly', () => {
    // Arrange
    const initialState = { authUser: null, isPreload: true };
    const user = { id: 'user-1', name: 'Test User' };
    const action = setAuthUser(user);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.authUser).toEqual(user);
    expect(nextState.isPreload).toBe(true); // isPreload should not change with this action
  });

  it('should handle UNSET_AUTH_USER action correctly', () => {
    // Arrange
    const initialState = { authUser: { id: 'user-1', name: 'Test User' }, isPreload: false };
    const action = unsetAuthUser();

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.authUser).toBeNull();
    expect(nextState.isPreload).toBe(false);
  });

  it('should handle SET_IS_PRELOAD action correctly', () => {
    // Arrange
    const initialState = { authUser: null, isPreload: true };
    const action = setIsPreload(false);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.isPreload).toBe(false);
    expect(nextState.authUser).toBeNull();
  });
});