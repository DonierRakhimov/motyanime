import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, userName, password }, { dispatch }) => {
    try {
      const response = await userAxios.post('/signup', {
        email,
        userName,
        password,
      });
      const { data: userData } = response;
      const payload = {
        userData,
        savedAnimes: [],
      };
      return payload;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 409) {
        throw new Error('Пользователь с таким email уже существует');
      } else {
        dispatch(
          notificationToggled({
            color: 'red',
            message: 'Не удалось зарегистрироваться',
          })
        );
        throw err;
      }
    }
  }
);
