import axios from 'axios';
import { userBase } from '../../../../utils/baseUrls';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationToggled } from '../../../UI/Notification/notificationSlice';

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      const response = await axios.post(
        userBase + '/logout',
        {},
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (err) {
      dispatch(
        notificationToggled({
          color: 'red',
          message: 'Не удалось выйти из аккаунта',
        })
      );
      throw err;
    }
  }
);


