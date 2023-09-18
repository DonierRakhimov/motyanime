import axios from 'axios';
import { userLoggedOut } from '../actionCreators';
import { userBase } from '../../../../utils/baseUrls';

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
    throw err;
  }
};
