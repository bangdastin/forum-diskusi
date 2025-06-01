import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    list: [],
    detail: null,
  },
  reducers: {
    receiveThreadsActionCreator: (state, action) => {
      state.list = action.payload;
    },
    addThreadActionCreator: (state, action) => {
      state.list.unshift(action.payload); // Tambahkan thread baru di awal list
    },
    receiveDetailThreadActionCreator: (state, action) => {
      state.detail = action.payload;
    },
    clearDetailThreadActionCreator: (state) => {
      state.detail = null;
    },
    upVoteThreadActionCreator: (state, action) => {
      const {
        threadId, userId,
      } = action.payload;
      const updatedList = state.list.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(userId) ?
              thread.upVotesBy.filter((id) => id !== userId) :
              [...thread.upVotesBy.filter((id) => id !== userId), userId],
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
      state.list = updatedList;

      if (state.detail && state.detail.id === threadId) {
        state.detail = {
          ...state.detail,
          upVotesBy: state.detail.upVotesBy.includes(userId) ?
            state.detail.upVotesBy.filter((id) => id !== userId) :
            [...state.detail.upVotesBy.filter((id) => id !== userId), userId],
          downVotesBy: state.detail.downVotesBy.filter((id) => id !== userId),
        };
      }
    },
    downVoteThreadActionCreator: (state, action) => {
      const {
        threadId, userId,
      } = action.payload;
      const updatedList = state.list.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(userId) ?
              thread.downVotesBy.filter((id) => id !== userId) :
              [...thread.downVotesBy.filter((id) => id !== userId), userId],
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
      state.list = updatedList;

      if (state.detail && state.detail.id === threadId) {
        state.detail = {
          ...state.detail,
          downVotesBy: state.detail.downVotesBy.includes(userId) ?
            state.detail.downVotesBy.filter((id) => id !== userId) :
            [...state.detail.downVotesBy.filter((id) => id !== userId), userId],
          upVotesBy: state.detail.upVotesBy.filter((id) => id !== userId),
        };
      }
    },
    neutralVoteThreadActionCreator: (state, action) => {
      const {
        threadId, userId,
      } = action.payload;
      const updatedList = state.list.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
      state.list = updatedList;

      if (state.detail && state.detail.id === threadId) {
        state.detail = {
          ...state.detail,
          upVotesBy: state.detail.upVotesBy.filter((id) => id !== userId),
          downVotesBy: state.detail.downVotesBy.filter((id) => id !== userId),
        };
      }
    },
    addCommentActionCreator: (state, action) => {
      if (state.detail) {
        state.detail.comments.push(action.payload);
        state.detail.totalComments += 1; // Increment totalComments
      }
    },
    upVoteCommentActionCreator: (state, action) => {
      const {
        threadId, commentId, userId,
      } = action.payload;
      if (state.detail && state.detail.id === threadId) {
        state.detail.comments = state.detail.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(userId) ?
                comment.upVotesBy.filter((id) => id !== userId) :
                [...comment.upVotesBy.filter((id) => id !== userId), userId],
              downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        });
      }
    },
    downVoteCommentActionCreator: (state, action) => {
      const {
        threadId, commentId, userId,
      } = action.payload;
      if (state.detail && state.detail.id === threadId) {
        state.detail.comments = state.detail.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(userId) ?
                comment.downVotesBy.filter((id) => id !== userId) :
                [...comment.downVotesBy.filter((id) => id !== userId), userId],
              upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        });
      }
    },
    neutralVoteCommentActionCreator: (state, action) => {
      const {
        threadId, commentId, userId,
      } = action.payload;
      if (state.detail && state.detail.id === threadId) {
        state.detail.comments = state.detail.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
              downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        });
      }
    },
  },
});

export const {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
} = threadsSlice.actions;

export default threadsSlice.reducer;
