export const selectGenresSlice = (state) => state.genres;

export const selectAllGenres = (state) => selectGenresSlice(state).allGenres;

export const selectCurrentGenres = (state) =>
  selectGenresSlice(state).currentGenres;

export const selectGenresAreLoaded = (state) =>
  selectAllGenres(state).length > 0;
