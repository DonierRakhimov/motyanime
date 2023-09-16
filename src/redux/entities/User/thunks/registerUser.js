import { userAxios } from '../../../../utils/axiosOptions';
import { userLoaded } from '../actionCreators';

export const registerUser = ({ email, userName, password }) => async (dispatch) => {
  try {
    const response = await userAxios.post('/signup', {
      data: { email, userName, password },
    });
    const { data: registeredUser } = response;
    dispatch(userLoaded(registeredUser));
  } catch (err) {
    console.log(err);
  }
};
