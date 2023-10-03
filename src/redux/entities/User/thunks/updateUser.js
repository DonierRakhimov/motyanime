import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/notificationSlice';

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await userAxios.patch('/users/me', formData);
      const { data } = response;
      dispatch(
        notificationToggled({
          color: 'green',
          message: 'Профиль успешно обновлён!',
        })
      );
      return data;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 401) {
        throw err;
      } else if (response && response.status === 400) {
        throw rejectWithValue(response);
      } else if (response && response.status === 409) {
        throw rejectWithValue(response);
      } else {
        dispatch(
          notificationToggled({
            color: 'red',
            message: 'Не удалось обновить профиль',
          })
        );
        throw err;
      }
    }
  }
);
