import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/buttons.css';

function VoteButtons({
  id,
  upVotesBy,
  downVotesBy,
  authUser,
  isUpVoted,
  isDownVoted,
  onUpVote,
  onDownVote,
  onNeutralVote,
  type = 'thread', // 'thread' or 'comment'
}) {
  const handleUpVote = () => {
    if (isUpVoted) {
      onNeutralVote(id);
    } else {
      onUpVote(id);
    }
  };

  const handleDownVote = () => {
    if (isDownVoted) {
      onNeutralVote(id);
    } else {
      onDownVote(id);
    }
  };

  return (
    <div className="vote-buttons">
      <button
        type="button"
        onClick={handleUpVote}
        className={`vote-button ${isUpVoted ? 'voted-up' : ''}`}
        aria-label={`Upvote ${type}`}
        disabled={!authUser}
      >
        <i className="fa-solid fa-thumbs-up" />
        {' '}
        {upVotesBy.length}
      </button>
      <button
        type="button"
        onClick={handleDownVote}
        className={`vote-button ${isDownVoted ? 'voted-down' : ''}`}
        aria-label={`Downvote ${type}`}
        disabled={!authUser}
      >
        <i className="fa-solid fa-thumbs-down" />
        {' '}
        {downVotesBy.length}
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['thread', 'comment']),
};

VoteButtons.defaultProps = {
  authUser: null,
  type: 'thread',
};

export default VoteButtons;
