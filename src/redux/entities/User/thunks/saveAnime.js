import { Link } from 'react-router-dom';
import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';
import { animeSaved } from '../actionCreators';
import { selectIsAuthorized } from '../selectors';

export const saveAnime = (anime, category) => async (dispatch, getState) => {
  const isAuthorized = selectIsAuthorized(getState());
  if (!isAuthorized) {
    dispatch(
      notificationToggled({
        color: 'red',
        message: 'Для этого действия нужна авторизация',
      })
    );
    return;
  }
  try {
    const {
      id: animeId,
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
    dispatch(animeSaved(savedAnime));
    dispatch(
      notificationToggled({
        color: 'green',
        message: `Добавлено в ${
          category === 'watched' ? 'просмотренное' : 'запланированное'
        }`,
      })
    );
    return saveAnime;
  } catch (err) {
    const { response } = err;
    if (response && response.status === 401) {
      console.log('Ошибка обработана перехватчиком');
    } else {
      dispatch(
        notificationToggled({ color: 'red', message: 'Не удалось сохранить' })
      );
    }
  }
};
