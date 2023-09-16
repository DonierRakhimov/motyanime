import { userAxios } from '../../../../utils/axiosOptions';
import { userLoggedOut } from '../actionCreators';

export const logoutUser = () => async (dispatch) => {
  try {
    await userAxios.post('/logout');
    dispatch(userLoggedOut());
  } catch (err) {
    console.log(err);
  }
};
