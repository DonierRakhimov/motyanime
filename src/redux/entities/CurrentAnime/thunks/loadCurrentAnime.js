import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userBase } from "../../../../utils/baseUrls";

export const loadCurrentAnime = createAsyncThunk('currentAnime/loadCurrentAnime', async ({signal, animeId}) => {
  try {
    const response = await axios.get('/animes/' + animeId, {
      baseURL: userBase,
      signal,
    });
    return response.data;
  } catch(err) {
    throw err;
  }
})