import { userAxios } from '../../../../utils/axiosOptions';
import { userLoaded } from '../actionCreators';

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await userAxios.post('/refresh');
    const { data: userData } = response;
    dispatch(userLoaded(userData));
  } catch (err) {
    console.log(err);
  }
};
