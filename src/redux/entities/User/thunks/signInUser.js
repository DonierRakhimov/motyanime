import { userAxios } from '../../../../utils/axiosOptions';
import { userLoaded } from '../actionCreators';

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    const response = await userAxios.post('/signin', {
      data: { email, password },
    });
    const { data: signedInUser } = response;
    dispatch(userLoaded(signedInUser));
  } catch (err) {
    console.log(err);
  }
};