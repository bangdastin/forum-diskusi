import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postedAt } from '../../utils/helpers';
import VoteButtons from '../votes/VoteButtons';
import '../../styles/cards.css';

function ThreadCard({
  id,
  title,
  body,
  category,
  createdAt,
  totalComments,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
  onNeutralVote,
}) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const truncatedBody = body.length > 150 ? `${body.substring(0, 150)}...` : body;

  return (
    <div className="thread-card">
      <div className="thread-card-header">
        <Link to={`/threads/${id}`}>
          <h3 className="thread-card-title">
            {title}
          </h3>
        </Link>
        <span className="thread-card-category">
          {`#${category}`}
        </span>
      </div>
      <div className="thread-card-body" dangerouslySetInnerHTML={{ __html: truncatedBody }} />
      <div className="thread-card-footer">
        <div className="thread-card-meta">
          <img
            src={owner.avatar || '/assets/default-avatar.png'}
            alt={owner.name}
            className="avatar-small"
          />
          <span>
            {owner.name}
          </span>
          <span className="dot-separator">·</span>
          <span>
            {postedAt(createdAt)}
          </span>
        </div>
        <div className="thread-card-actions">
          <VoteButtons
            id={id}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUser={authUser}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralVote={onNeutralVote}
            type="thread"
          />
          <span className="comments-count">
            <i className="fa-solid fa-comment" />
            {' '}
            {totalComments}
            {' '}
            Komentar
          </span>
        </div>
      </div>
    </div>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
};

ThreadCard.defaultProps = {
  authUser: null,
};

export default ThreadCard;
