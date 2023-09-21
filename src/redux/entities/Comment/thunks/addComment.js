import { userAxios } from '../../../../utils/axiosOptions';
import { notificationToggled } from '../../../UI/Notification/actionCreators';
import { commentOwnerAdded } from '../../CommentOwner/actionCreators';
import { selectIsAuthorized } from '../../User/selectors';
import { commentAdded } from '../actionCreators';

export const addComment =
  (comment = {}) =>
  async (dispatch, getState) => {
    const isAuthorized = selectIsAuthorized(getState());
    if (!isAuthorized) {
      dispatch(
        notificationToggled({
          color: 'red',
          message: 'Для этого действия нужна авторизация',
        })
      );
      return;
    }
    try {
      const response = await userAxios.post('/comments', comment);
      const { data: createdComment } = response;
      dispatch(commentAdded(createdComment));
      dispatch(commentOwnerAdded(createdComment.owner));
      return createdComment;
    } catch (err) {
      const { response } = err;
      if (response && response.status === 401) {
        return;
      } else {
        dispatch(
          notificationToggled({ color: 'red', message: 'Не удалось создать комментарий' })
        );
      }
    }
  };
