import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/leaderboard.css'; // Buat file styling ini

function LeaderboardItem({ user, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-user-info">
        <img
          src={user.avatar || '/assets/default-avatar.png'}
          alt={user.name}
          className="avatar-medium"
        />
        <span>
          {user.name}
        </span>
      </div>
      <span className="leaderboard-score">
        {score}
      </span>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
