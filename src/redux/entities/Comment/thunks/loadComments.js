import { userAxios } from '../../../../utils/axiosOptions'
import { commentOwnersLoaded } from '../../CommentOwner/actionCreators';
import { commentsFailedToLoad, commentsLoaded, commentsLoading } from '../actionCreators';

export const loadComments = (signal, animeId) => async (dispatch) => {
  try {
    dispatch(commentsLoading());
    const response = await userAxios.get('/comments/' + animeId, {
      signal,
    });
    const { data: comments } = response;
    const owners = comments.map(comment => comment.owner);
    dispatch(commentsLoaded(comments));
    dispatch(commentOwnersLoaded(owners));
    return comments;
  } catch (err) {
    dispatch(commentsFailedToLoad())
  }
}