export const selectCurrentAnimeSlice = (state) => state.currentAnime;

export const selectCurrentAnime = (state) => selectCurrentAnimeSlice(state).currentAnime;

export const selectCurrentAnimeStatus = (state) => selectCurrentAnimeSlice(state).status;