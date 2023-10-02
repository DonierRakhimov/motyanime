import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async ({ email, password }, { dispatch }) => {
    try {
      const signInResponse = await userAxios.post('/signin', {
        email,
        password,
      });
      const savedAnimesRespone = await userAxios.get('/savedAnimes');
      const { data: userData } = signInResponse;
      const { data: savedAnimes } = savedAnimesRespone;
      const payload = {
        userData,
        savedAnimes,
      };
      return payload;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 400) {
        throw new Error('Неправильная почта или пароль');
      } else {
        dispatch(
          notificationToggled({
            color: 'red',
            message: 'Не удалось войти',
          })
        );
        throw err;
      }
    }
  }
);
