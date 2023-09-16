export const ACTION_TYPES = {
  userLoaded: 'user/userLoaded',
  userLoggedOut: 'user/userLoggedOut',
  userUpdated: 'user/userUpdated',
}

export const userLoaded = (user) => ({
  type: ACTION_TYPES.userLoaded,
  payload: user,
})

export const userLoggedOut = () => ({
  type: ACTION_TYPES.userLoggedOut,
})

export const userUpdated = (updatedUser) => ({
  type: ACTION_TYPES.userUpdated,
  payload: updatedUser,
})