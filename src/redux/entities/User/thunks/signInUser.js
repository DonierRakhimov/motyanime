import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';
import { userLoaded } from '../actionCreators';

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
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
      }
      dispatch(userLoaded(payload));
      return payload;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 400) {
        throw new Error('Неправильная почта или пароль');
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
