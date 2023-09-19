import axios from 'axios';
import { userLoggedOut } from '../actionCreators';
import { userBase } from '../../../../utils/baseUrls';
import { notificationToggled } from '../../../UI/Notification/actionCreators';

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axios.post(
      userBase + '/logout',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userLoggedOut());
    return response;
  } catch (err) {
    dispatch(
      notificationToggled({ color: 'red', message: 'Не удалось выйти из аккаунта' })
    );
  }
};
