export const selectUserSlice = (state) => state.user;

export const selectUserData = (state) => selectUserSlice(state).userData;

export const selectIsAuthorized = (state) => selectUserSlice(state).isAuthorized;

export const selectSavedAnimes = (state) => selectUserSlice(state).savedAnimes;

export const selectWatchedAnimes = (state) => selectSavedAnimes(state).filter(savedAnime => savedAnime.category === 'watched');

export const selectPlannedAnimes = (state) => selectSavedAnimes(state).filter(savedAnime => savedAnime.category === 'planned');

export const selectIsWatched = (state, animeId) => selectWatchedAnimes(state).find((watchedAnime) => watchedAnime.animeId == animeId); 

export const selectIsPlanned = (state, animeId) => selectPlannedAnimes(state).find((plannedAnime) => plannedAnime.animeId == animeId); 

