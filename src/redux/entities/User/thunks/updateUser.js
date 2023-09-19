import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';
import { userUpdated } from '../actionCreators';

export const updateUser =
  ({ email, userName }) =>
  async (dispatch, getState) => {
    try {
      const response = await userAxios.patch('/users/me', {
        email,
        userName,
      });
      const { data } = response;
      dispatch(userUpdated(data));
    } catch (err) {
      const { response } = err;
      if (response && response.status === 401) {
        console.log('Ошибка обработана перехватчиком');
      } else if (response && response.status === 409) {
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
