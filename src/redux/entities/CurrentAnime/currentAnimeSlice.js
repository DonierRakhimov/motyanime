import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../utils/requestStatuses";
import { loadCurrentAnime } from "./thunks/loadCurrentAnime";

const initialState = {
  status: REQUEST_STATUSES.idle,
  currentAnime: {},
};

export const currentAnimeSlice = createSlice({
  name: "currentAnime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCurrentAnime.pending, (state) => {
      state.status = REQUEST_STATUSES.pending;
    });
    builder.addCase(loadCurrentAnime.fulfilled, (state, action) => {
      state.currentAnime = action.payload;
      state.status = REQUEST_STATUSES.success;
    });
  },
});

export default currentAnimeSlice.reducer;
