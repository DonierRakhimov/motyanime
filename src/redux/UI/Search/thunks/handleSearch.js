import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiBase } from "../../../../utils/baseUrls";
import { notificationToggled } from "../../Notification/notificationSlice";

export const handleSearch = createAsyncThunk(
  "search/handleSearch",
  async ({ searchValue }, { dispatch }) => {
    try {
      const response = await axios.get("/animes", {
        baseURL: apiBase,
        params: {
          search: searchValue,
        },
      });
      const { data: searchResults } = response;
      return searchResults.list;
    } catch (err) {
      dispatch(
        notificationToggled({ color: "red", message: "Что-то пошло не так..." })
      );
      throw err;
    }
  },
  {
    condition: ({ makeRequest = true }) => makeRequest
  }
);
