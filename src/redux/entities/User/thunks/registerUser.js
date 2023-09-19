import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';
import { userLoaded } from '../actionCreators';

export const registerUser =
  ({ email, userName, password }) =>
  async (dispatch) => {
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
      dispatch(userLoaded(payload));
      return payload;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 409) {
        throw new Error('Пользователь с таким email уже существует');
      } else {
        dispatch(
          notificationToggled({
            color: 'red',
            message: 'Что-то пошло не так...',
          })
        );
      }
    }
  };
