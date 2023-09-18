import { userAxios } from '../../../../utils/axiosOptions'
import { userUpdated } from '../actionCreators';

export const updateUser = ({ email, userName }) => async (dispatch, getState) => {
  try {
    const response = await userAxios.patch('/users/me', {
      email,
      userName,
    });
    const { data } = response;
    dispatch(userUpdated(data));
  } catch (err) {
    if (err.response) {
      const { data } = err.response;
      throw new Error(data.message);
    } else {
      throw new Error('Что-то пошло не так...');
    }
  }
}