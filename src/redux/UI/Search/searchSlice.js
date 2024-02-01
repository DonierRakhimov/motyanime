import { createSlice } from "@reduxjs/toolkit";
import { handleSearch } from "./thunks/handleSearch";
import { REQUEST_STATUSES } from "../../../utils/requestStatuses";

const initialState = {
  searchResults: [],
  status: REQUEST_STATUSES.idle,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setSearchStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSearch.pending, (state) => {
        state.status = REQUEST_STATUSES.pending;
      })
      .addCase(handleSearch.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.status = REQUEST_STATUSES.success;
      });
  },
});

export const { setSearchResults, setSearchStatus } = searchSlice.actions;

export default searchSlice.reducer;
