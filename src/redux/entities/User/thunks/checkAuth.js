import { userAxios } from '../../../../utils/axiosOptions';
import { userLoaded } from '../actionCreators';

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await userAxios.post('/refresh');
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
