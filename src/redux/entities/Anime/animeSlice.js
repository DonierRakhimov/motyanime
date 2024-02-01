import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../utils/requestStatuses";
import { loadCurrentPage } from "./thunks/loadCurrentPage";

const initialState = {
  status: REQUEST_STATUSES.idle,
  entities: [],
  currentPage: 1,
  totalCount: 0,
  fullyLoadedAnime: {},
};

const animesSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {
    animesReseted(state) {
      state.entities = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentPage.fulfilled, (state, action) => {
        if (state.currentPage === 1) {
          state.status = REQUEST_STATUSES.idle;
          state.entities = action.payload.list;
          state.currentPage = ++state.currentPage;
          state.totalCount = action.payload.total;
        } else {
          state.entities = [...state.entities, ...action.payload.list];
          state.currentPage = ++state.currentPage;
        }
      })
      .addCase(loadCurrentPage.pending, (state, action) => {
        state.status = REQUEST_STATUSES.pending;
      });
  },
});

export const { animesAdded, animesLoaded, animesLoading, animesReseted } =
  animesSlice.actions;

export default animesSlice.reducer;
