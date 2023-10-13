import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userBase } from "../../../../utils/baseUrls";

export const handleSearch = createAsyncThunk(
  "search/handleSearch",
  async (search) => {
    try {
      const response = await axios.get("/animes", {
        baseURL: userBase,
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
