export const ACTION_TYPES = {
  commentsLoaded: 'comment/commentsLoaded',
  commentAdded: 'comment/commentAdded',
  commentsLoading: 'comment/commentsLoading',
  commentsFailedToLoad: 'comment/commentsFailedToLoad'
}

export const commentsLoaded = (comments = []) => ({
  type: ACTION_TYPES.commentsLoaded,
  payload: comments,
})

export const commentAdded = (comment = {}) => ({
  type: ACTION_TYPES.commentAdded,
  payload: comment,
})

export const commentsLoading = () => ({
  type: ACTION_TYPES.commentsLoading,
})

export const commentsFailedToLoad = () => ({
  type: ACTION_TYPES.commentsFailedToLoad
})