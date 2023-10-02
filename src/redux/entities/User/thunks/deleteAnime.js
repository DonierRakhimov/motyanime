import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';

export const deleteAnime = createAsyncThunk(
  'user/animeDeleted',
  async (_id, { dispatch }) => {
    try {
      await userAxios.delete('/savedAnimes/' + _id);
      dispatch(notificationToggled({ color: 'green', message: 'Удалено!' }));
      return _id;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 401) {
        throw err;
      } else {
        dispatch(
          notificationToggled({ color: 'red', message: 'Не удалось удалить' })
        );
        throw err;
      }
    }
  }
);


