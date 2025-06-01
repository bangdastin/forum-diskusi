import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../redux/actions/leaderboardActions';
import LeaderboardItem from '../components/leaderboard/LeaderboardItem';
import '../styles/leaderboard.css';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (!leaderboards) {
    return <p>Loading leaderboard...</p>;
  }

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard Pengguna Aktif</h2>
      <div className="leaderboard-list">
        <div className="leaderboard-header">
          <span>Pengguna</span>
          <span>Skor</span>
        </div>
        {leaderboards.map((lb) => (
          <LeaderboardItem key={lb.user.id} {...lb} />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
