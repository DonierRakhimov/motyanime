import { userAxios } from '../../../../utils/axiosOptions';
import { userLoaded } from '../actionCreators';

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    const response = await userAxios.post('/signin', {
      data: { email, password },
    });
    const { data: signedInUser } = response;
    dispatch(userLoaded(signedInUser));
    return signedInUser;
  } catch (err) {
    if (err.response) {
      const { data } = err.response;
      throw new Error(data.message);
    } else {
      throw new Error('Что-то пошло не так...')
    }
  }
};