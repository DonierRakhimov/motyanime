import { REQUEST_STATUSES } from '../../../utils/requestStatuses';

export const selectAnimesSlice = (state) => state.animes;

export const selectAnimes = (state) => selectAnimesSlice(state).entities;

export const selectAnimesStatus = (state) => selectAnimesSlice(state).status;

export const selectCurrentPage = (state) => selectAnimesSlice(state).currentPage;

export const selectStatusIsLoading = (state) => selectAnimesStatus(state) === REQUEST_STATUSES.pending;

export const selectAnimeRange = (state, from, to) => selectAnimes(state).slice(from, to);

export const selectTotalPages = (state) => selectAnimesSlice(state).totalPages;

export const selectIsMoreToLoad = (state) => selectCurrentPage(state) <= selectTotalPages(state) 

export const selectRandomAnimes = (state, amount) => {
  const animes = selectAnimes(state);

  if (!animes.length) {
    return [];
  }

  if (animes.length <= amount) {
    return animes;
  }

  let randomAnimes = [];
  for (let i=0; i < amount; i++) {
    let randomIndex;
    let randomAnime;
    do {
      randomIndex = Math.floor(Math.random() * animes.length);
      randomAnime = animes[randomIndex];
    } while (randomAnimes.indexOf(randomAnime) !== -1)
    randomAnimes.push(randomAnime);
  }
  return randomAnimes;
}