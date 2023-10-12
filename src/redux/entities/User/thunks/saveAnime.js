import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAxios } from '../../../../utils/axiosOptions';
import { selectIsAuthorized } from '../selectors';
import { notificationToggled } from '../../../UI/Notification/notificationSlice';

export const saveAnime = createAsyncThunk(
  'user/saveAnime',
  async ({ anime, category }, { dispatch, getState }) => {
    const isAuthorized = selectIsAuthorized(getState());
    if (!isAuthorized) {
      dispatch(
        notificationToggled({
          color: 'red',
          message: 'Для этого действия нужна авторизация',
        })
      );
      throw new Error('');
    }
    try {
      const {
        _id: animeId,
        genres,
        status,
        names,
        image = 'https://upload.wikimedia.org/wikipedia/ru/1/11/Naruto-manga.jpg',
      } = anime;
      const response = await userAxios.post('/savedAnimes', {
        animeId,
        genres,
        status: {
          string: status?.string,
        },
        names: {
          ru: names?.ru,
        },
        image,
        category,
      });
      const { data: savedAnime } = response;
      dispatch(
        notificationToggled({
          color: 'green',
          message: `Добавлено в ${
            category === 'watched' ? 'просмотренное' : 'запланированное'
          }`,
        })
      );
      return savedAnime;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 401) {
        throw err;
      } else {
        dispatch(
          notificationToggled({ color: 'red', message: 'Не удалось сохранить' })
        );
        throw err;
      }
    }
  }
);
