import { requestStatuses } from '../../../utils/requestStatuses';

export const selectTitlesSlice = (state) => state.titles;

export const selectTitles = (state) => selectTitlesSlice(state).entities;

export const selectTitlesStatus = (state) => selectTitlesSlice(state).status;

export const selectCurrentPage = (state) => selectTitlesSlice(state).currentPage;

export const selectStatusIsLoading = (state) => selectTitlesStatus(state) === requestStatuses.loading;

export const selectTitleRange = (state, from, to) => selectTitles(state).slice(from, to);

export const selectTotalPages = (state) => selectTitlesSlice(state).totalPages;

export const selectIsMoreToLoad = (state) => selectCurrentPage(state) <= selectTotalPages(state) 

export const selectRandomTitles = (state, amount) => {
  const titles = selectTitles(state);

  if (!titles.length) {
    return [];
  }

  if (titles.length <= amount) {
    return titles;
  }

  let randomTitles = [];
  for (let i=0; i < amount; i++) {
    let randomIndex;
    let randomTitle;
    do {
      randomIndex = Math.floor(Math.random() * titles.length);
      randomTitle = titles[randomIndex];
    } while (randomTitles.indexOf(randomTitle) !== -1)
    randomTitles.push(randomTitle);
  }
  return randomTitles;
}