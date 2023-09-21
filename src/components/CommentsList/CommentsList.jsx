import React from 'react';
import s from './commentlist.module.css';
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { loadComments } from '../../redux/entities/Comment/thunks/loadComments';
import {
  selectCommentIds,
  selectCommentStatus,
} from '../../redux/entities/Comment/selectors';
import isEmpty from 'lodash.isempty';
import { REQUEST_STATUSES } from '../../utils/requestStatuses';
import CommentForm from '../CommentForm/CommentForm';
import { addComment } from '../../redux/entities/Comment/thunks/addComment';

export default function CommentsList({ animeId }) {
  const commentIds = useSelector(selectCommentIds);
  const commentStatus = useSelector(selectCommentStatus);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const controller = new AbortController();
    dispatch(loadComments(controller.signal, animeId));
    return () => controller.abort();
  }, [animeId, dispatch]);

  const handleCommentSubmit = (text) => {
    const payload = {
      createdAt: Date.now(),
      text,
      animeId,
    }
    dispatch(addComment(payload))
  } 

  return (
    <div>
      <h2 className={s.title}>Комментарии</h2>
      <div className={s.commentWrapper}>
        <CommentForm onCommentSubmit={handleCommentSubmit}></CommentForm>
      </div>
      {commentStatus === REQUEST_STATUSES.pending ? (
        <div>Идет загрузка</div>
      ) : commentStatus === REQUEST_STATUSES.failed ? (
        <div>Не получилось загрузить</div>
      ) : (
        commentStatus === REQUEST_STATUSES.success &&
        (isEmpty(commentIds) ? (
          <div>Коммментариев нет</div>
        ) : (
          commentIds.map((id) => (
            <div key={id} className={s.commentWrapper}>
              <Comment commentId={id}></Comment>
            </div>
          ))
        ))
      )}
    </div>
  );
}
