import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBase } from "../../../../utils/baseUrls";

export const handleSearch = createAsyncThunk(
  "search/handleSearch",
  async (search) => {
    try {
      const response = await axios.get("/animes", {
        baseURL: apiBase,
        params: {
          search,
        },
      });
      const { data: searchResults } = response;
      return searchResults.list;
    } catch (err) {
      throw err;
    }
  }
);
