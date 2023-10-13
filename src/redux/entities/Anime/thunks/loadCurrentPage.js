import { selectCurrentPage } from "../selectors";
import { selectCurrentGenres } from "../../../UI/Genres/selectors";
import { selectCurrentSort } from "../../../UI/Sort/selectors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import isEmpty from "lodash.isempty";
import axios from "axios";
import { apiBase } from "../../../../utils/baseUrls";

export const loadCurrentPage = createAsyncThunk(
  "animes/loadCurrentPage",
  async (signal, { getState }) => {
    try {
      const currentPage = selectCurrentPage(getState());
      const currentGenres = selectCurrentGenres(getState());
      const currentSort = selectCurrentSort(getState());

      const params = {
        page: currentPage,
        limit: 8,
      };

      if (!isEmpty(currentGenres)) {
        params.genres = currentGenres.join();
      }

      if (currentSort) {
        if (currentSort === "season.year") {
          params.sort = currentSort + ",desc";
        } else {
          params.sort = currentSort;
        }
      }

      const response = await axios.get("/animes", {
        baseURL: apiBase,
        params,
        signal,
      });
      const { data } = response;

      return data;
    } catch (err) {
      throw err;
    }
  }
);
