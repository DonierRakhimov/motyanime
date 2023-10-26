import { createSelector } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../utils/requestStatuses";

export const selectAnimesSlice = (state) => state.animes;

export const selectAnimes = (state) => selectAnimesSlice(state).entities;

export const selectAnimesStatus = (state) => selectAnimesSlice(state).status;

export const selectCurrentPage = (state) =>
  selectAnimesSlice(state).currentPage;

export const selectStatusIsLoading = (state) =>
  selectAnimesStatus(state) === REQUEST_STATUSES.pending;

export const selectAnimeRange = createSelector(
  selectAnimes,
  (state, from) => from,
  (state, from, to) => to,
  (animes, from, to) => animes.slice(from, to)
);

export const selectTotalCount = (state) => selectAnimesSlice(state).totalCount;

export const selectIsMoreToLoad = (state) =>
  selectAnimes(state).length < selectTotalCount(state);

export const selectRandomAnimes = createSelector(
  selectAnimes,
  (state, amount) => amount,
  (animes, amount) => {
    if (!animes.length) {
      return [];
    }

    if (animes.length <= amount) {
      return animes;
    }

    let randomAnimes = [];
    for (let i = 0; i < amount; i++) {
      let randomIndex;
      let randomAnime;
      do {
        randomIndex = Math.floor(Math.random() * animes.length);
        randomAnime = animes[randomIndex];
      } while (randomAnimes.indexOf(randomAnime) !== -1);
      randomAnimes.push(randomAnime);
    }
    return randomAnimes;
  }
);