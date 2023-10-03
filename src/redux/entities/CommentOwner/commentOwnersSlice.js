import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { addComment } from '../Comment/thunks/addComment';
import { loadComments } from '../Comment/thunks/loadComments';

export const commentOwnersAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
})

export const commentOwnersSlice = createSlice({
  name: 'commentOwners',
  initialState: commentOwnersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { payload: comment } = action;
      commentOwnersAdapter.addOne(state, comment.owner);
    })
    builder.addCase(loadComments.fulfilled, (state, action) => {
      const { payload: comments } = action;
      const owners = comments.map(comment => comment.owner);
      commentOwnersAdapter.setAll(state, owners);
    })
  }
});


export default commentOwnersSlice.reducer;
