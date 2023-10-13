export const selectSearchSlice = (state) => state.search;

export const selectSearchResults = (state) => selectSearchSlice(state).searchResults;

export const selectSearchStatus = (state) => selectSearchSlice(state).status;