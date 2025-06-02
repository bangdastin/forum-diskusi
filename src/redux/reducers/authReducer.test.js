import authReducer, {
  setAuthUser,
  unsetAuthUser,
  setIsPreload,
} from './authReducer';

describe('authReducer function', () => {
  const initialState = { authUser: null, isPreload: true };

  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const action = { type: 'UNKNOWN_ACTION' };
    // Act
    const nextState = authReducer(initialState, action);
    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle SET_AUTH_USER action correctly', () => {
    // Arrange
    const user = { id: 'user-1', name: 'Test User' };
    const action = setAuthUser(user);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.authUser).toEqual(user);
    expect(nextState.isPreload).toBe(true); // isPreload should remain unchanged by this action
  });

  it('should handle UNSET_AUTH_USER action correctly', () => {
    // Arrange
    const currentState = { authUser: { id: 'user-1', name: 'Test User' }, isPreload: false };
    const action = unsetAuthUser();

    // Act
    const nextState = authReducer(currentState, action);

    // Assert
    expect(nextState.authUser).toBeNull();
    expect(nextState.isPreload).toBe(false); // isPreload should remain unchanged
  });

  it('should handle SET_IS_PRELOAD action correctly', () => {
    // Arrange
    const action = setIsPreload(false);

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.isPreload).toBe(false);
    expect(nextState.authUser).toBeNull(); // authUser should remain unchanged

    // Arrange for setting to true
    const currentStatePreloadFalse = { authUser: null, isPreload: false };
    const actionTrue = setIsPreload(true);

    // Act
    const nextStateTrue = authReducer(currentStatePreloadFalse, actionTrue);

    // Assert
    expect(nextStateTrue.isPreload).toBe(true);
  });
});