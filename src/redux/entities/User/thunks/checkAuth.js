import axios from 'axios';
import {
  userLoaded,
  checkingAuth,
  checkingAuthFinished,
} from '../actionCreators';
import { userBase } from '../../../../utils/baseUrls';
import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';

export const checkAuth = () => async (dispatch) => {
  try {
    dispatch(checkingAuth());
    const refreshResponse = await axios.get('/refresh', {
      baseURL: userBase,
      withCredentials: true,
    });
    const savedAnimesRespone = await userAxios.get('/savedAnimes');
    const { data: userData } = refreshResponse;
    const { data: savedAnimes } = savedAnimesRespone;
    const payload = {
      userData,
      savedAnimes,
    };
    dispatch(userLoaded(payload));
    return payload;
  } catch (err) {
    const { response } = err;
    if (response && response.status === 401) {
      console.log('Пользователь не авторизован');
    } else {
      dispatch(
        notificationToggled({
          color: 'red',
          message: 'Не удалось авторизоваться',
        })
      );
    }
  } finally {
    dispatch(checkingAuthFinished());
  }
};
