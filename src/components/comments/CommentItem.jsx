import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { postedAt } from '../../utils/helpers';
import VoteButtons from '../votes/VoteButtons';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../../redux/actions/threadsActions'; // Sesuaikan path jika perlu
import '../../styles/comments.css';

function CommentItem({ comment, threadId }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.authUser);

  const isUpVoted = authUser && comment.upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && comment.downVotesBy.includes(authUser.id);

  const onUpVote = (commentId) => {
    dispatch(asyncUpVoteComment({ threadId, commentId }));
  };

  const onDownVote = (commentId) => {
    dispatch(asyncDownVoteComment({ threadId, commentId }));
  };

  const onNeutralVote = (commentId) => {
    dispatch(asyncNeutralVoteComment({ threadId, commentId }));
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <img
          src={comment.owner.avatar || '/assets/default-avatar.png'}
          alt={comment.owner.name}
          className="avatar-small"
        />
        <span className="comment-owner-name">
          {comment.owner.name}
        </span>
        <span className="comment-date">
          {postedAt(comment.createdAt)}
        </span>
      </div>
      <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
      <div className="comment-actions">
        <VoteButtons
          id={comment.id}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          authUser={authUser}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
          type="comment"
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
