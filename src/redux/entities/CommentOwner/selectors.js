export const selectCommentOwnerSlice = (state) => state.commentOwner;

export const selectCommentOwners = (state) => selectCommentOwnerSlice(state).entities;

export const selectCommentOwnerIds = (state) => selectCommentOwnerSlice(state).allIds;

export const selectCommentOwnerById = (state, _id) => selectCommentOwners(state)[_id];

export const selectCommentOwnersArray = (state) => Object.values(selectCommentOwners(state));