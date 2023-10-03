import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUSES } from '../../../utils/requestStatuses';
import { addComment } from './thunks/addComment';
import { loadComments } from './thunks/loadComments';

export const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment._id,
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState({
    status: REQUEST_STATUSES.idle,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        const { payload: comment } = action;
        commentsAdapter.addOne(state, {
          ...comment,
          owner: comment.owner._id,
        });
      })
      .addCase(loadComments.pending, (state, action) => {
        state.status = REQUEST_STATUSES.pending;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        const { payload: comments } = action;
        const normalizedComments = comments.map((comment) => ({
          ...comment,
          owner: comment.owner._id,
        }));
        commentsAdapter.setAll(state, normalizedComments);
        state.status = REQUEST_STATUSES.success;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.status = REQUEST_STATUSES.failed;
      });
  },
});

export const commentSelectors = commentsAdapter.getSelectors(state => state.comments)

export default commentsSlice.reducer;
