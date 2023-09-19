export const ACTION_TYPES = {
  userLoaded: 'user/userLoaded',
  userLoggedOut: 'user/userLoggedOut',
  userUpdated: 'user/userUpdated',
  animeSaved: 'user/animeSaved',
  animeDeleted: 'user/animeDeleted',
};

export const userLoaded = ({ userData, savedAnimes }) => ({
  type: ACTION_TYPES.userLoaded,
  payload: { userData, savedAnimes },
});

export const userLoggedOut = () => ({
  type: ACTION_TYPES.userLoggedOut,
});

export const userUpdated = (updatedUser) => ({
  type: ACTION_TYPES.userUpdated,
  payload: updatedUser,
});

export const animeSaved = (savedAnime) => ({
  type: ACTION_TYPES.animeSaved,
  payload: savedAnime
})

export const animeDeleted = (_id) => ({
  type: ACTION_TYPES.animeDeleted,
  payload: _id,
})
