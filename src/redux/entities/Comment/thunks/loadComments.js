import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async ({ signal, animeId }) => {
    try {
      const response = await userAxios.get('/comments/' + animeId, {
        signal,
      });
      const { data: comments } = response;
      return comments;
    } catch (err) {
      throw err;
    }
  }
);
