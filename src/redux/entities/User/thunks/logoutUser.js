import { userAxios } from '../../../../utils/axiosOptions';
import { userLoggedOut } from '../actionCreators';

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await userAxios.post('/logout');
    dispatch(userLoggedOut());
    return response;
  } catch (err) {
    throw err;
  }
};
