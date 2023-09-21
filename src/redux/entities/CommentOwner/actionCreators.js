export const ACTION_TYPES = {
  commentOwnersLoaded: 'commentOwner/commentOwnersLoaded',
  commentOwnerAdded: 'commentOwner/commentOwnerAdded'
}

export const commentOwnersLoaded = (commentOwners = []) => ({
  type: ACTION_TYPES.commentOwnersLoaded,
  payload: commentOwners,
})

export const commentOwnerAdded  = (commentOwner = {}) => ({
  type: ACTION_TYPES.commentOwnerAdded,
  payload: commentOwner,
})