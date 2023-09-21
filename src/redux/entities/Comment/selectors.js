export const selectCommentSlice = (state) => state.comment;

export const selectComments = (state) => selectCommentSlice(state).entities;

export const selectCommentIds = (state) => selectCommentSlice(state).allIds;

export const selectCommentById = (state, _id) => selectComments(state)[_id];

export const selectCommentStatus = (state) => selectCommentSlice(state).status;

export const selectCommentsArray = (state) => Object.values(selectComments(state));
