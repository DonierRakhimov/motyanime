import axios from 'axios';
import { userLoaded } from '../actionCreators';
import { userBase } from '../../../../utils/baseUrls';

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await axios.get('/refresh', {
      baseURL: userBase,
      withCredentials: true,
    });
    const { data: userData } = response;
    dispatch(userLoaded(userData));
    return userData;
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        console.log('Пользователь не авторизован')
      }
    } else {
      console.log('Что-то пошло не так');
    }
  }
};
