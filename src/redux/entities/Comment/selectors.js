import { commentsAdapter } from "./commentsSlice";

export const selectCommentsSlice = (state) => state.comments;

const commentsSelector = commentsAdapter.getSelectors(selectCommentsSlice);

export const { selectIds: selectCommentsIds } = commentsSelector;

export const { selectById: selectCommentById } = commentsSelector;

export const selectCommentStatus = (state) => selectCommentsSlice(state).status;
