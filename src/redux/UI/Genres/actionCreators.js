export const ACTION_TYPES = {
  genresLoaded: 'genres/loadGenres',
  genreAdded: 'genres/genreAdded',
  genreRemoved: 'genres/genreRemoved',
  currentGenresReplaced: 'genres/currentGenresReplaced',
};

export const genresLoaded = (genres = []) => ({
  type: ACTION_TYPES.genresLoaded,
  payload: genres,
});

export const genreAdded = (genre = '') => ({
  type: ACTION_TYPES.genreAdded,
  payload: genre,
});

export const genreRemoved = (genre = '') => ({
  type: ACTION_TYPES.genreRemoved,
  payload: genre,
});

export const currentGenresReplaced = (newGenres = []) => ({
  type: ACTION_TYPES.currentGenresReplaced,
  payload: newGenres,
});
