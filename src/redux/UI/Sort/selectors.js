export const selectSortSlice = (state) => state.sort;

export const selectCurrentSort = (state) => selectSortSlice(state).currentSort;
