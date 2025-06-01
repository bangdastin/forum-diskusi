import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveDetailThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../redux/actions/threadsActions';
import ThreadDetail from '../components/threads/ThreadDetail';
import CommentInput from '../components/comments/CommentInput';
import CommentItem from '../components/comments/CommentItem';
import '../styles/detail-thread.css';

function DetailThreadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail: detailThread } = useSelector((state) => state.threads);
  const { authUser } = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [id, dispatch]);

  const onUpVoteThread = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const onNeutralVoteThread = (threadId) => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  if (!detailThread) {
    return <p>Loading detail thread...</p>; // Atau komponen loading lain
  }

  const { comments } = detailThread;

  return (
    <div className="detail-thread-page">
      <ThreadDetail
        detailThread={detailThread}
        authUser={authUser}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
        onNeutralVote={onNeutralVoteThread}
      />

      {authUser && <CommentInput threadId={id} />}

      <div className="comments-section">
        <h3>
          Komentar (
          {comments.length}
          )
        </h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} threadId={id} />
          ))
        ) : (
          <p>Belum ada komentar.</p>
        )}
      </div>
    </div>
  );
}

export default DetailThreadPage;
