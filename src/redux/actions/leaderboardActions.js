import {
  showLoading, hideLoading,
} from '../reducers/loadingBarReducer';
import { receiveLeaderboardsActionCreator } from '../reducers/leaderboardReducer';
import api from '../../api';

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncReceiveLeaderboards };
