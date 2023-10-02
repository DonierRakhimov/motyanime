import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';

export const updateUser = createAsyncThunk('user/updateUser', async (formData, {dispatch}) => {
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
      throw new Error('Переданы некорректные данные');
    } else if (response && response.status === 409) {
      throw new Error('Пользователь с таким email уже существует');
    } else {
      dispatch(
        notificationToggled({
          color: 'red',
          message: 'Что-то пошло не так...',
        })
      );
      throw err;
    }
  }
});