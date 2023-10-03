import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';
import { selectIsAuthorized } from '../../User/selectors';
import { notificationToggled } from '../../../UI/Notification/notificationSlice';

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment = {}, { dispatch, getState }) => {
    const isAuthorized = selectIsAuthorized(getState());
    if (!isAuthorized) {
      dispatch(
        notificationToggled({
          color: 'red',
          message: 'Для этого действия нужна авторизация',
        })
      );
      throw new Error();
    }
    try {
      const response = await userAxios.post('/comments', comment);
      const { data: createdComment } = response;
      dispatch(notificationToggled({
        color: 'green',
        message: 'Комментарий опубликован'
      }))
      return createdComment;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 401) {
        throw err;
      } else {
        dispatch(
          notificationToggled({
            color: 'red',
            message: 'Не удалось создать комментарий',
          })
        );
        throw err;
      }
    }
  }
);
