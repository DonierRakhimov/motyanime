import { commentOwnersAdapter } from "./commentOwnersSlice";

const selectCommentOwnersSlice = (state) => state.commentOwners;

const commentOwnersSelectors = commentOwnersAdapter.getSelectors(
  selectCommentOwnersSlice
);

export const { selectById: selectCommentOwnerById } = commentOwnersSelectors;
