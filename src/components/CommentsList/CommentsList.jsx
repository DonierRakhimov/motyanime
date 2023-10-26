import React from "react";
import s from "./commentlist.module.css";
import Comment from "../Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { loadComments } from "../../redux/entities/Comment/thunks/loadComments";
import {
  selectCommentsIds,
  selectCommentStatus,
} from "../../redux/entities/Comment/selectors";
import isEmpty from "lodash.isempty";
import { REQUEST_STATUSES } from "../../utils/requestStatuses";
import CommentForm from "../CommentForm/CommentForm";
import { addComment } from "../../redux/entities/Comment/thunks/addComment";

export default function CommentsList({ animeId }) {
  const commentIds = useSelector(selectCommentsIds);
  const commentStatus = useSelector(selectCommentStatus);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const controller = new AbortController();
    dispatch(loadComments({ signal: controller.signal, animeId }));
    return () => controller.abort();
  }, [animeId, dispatch]);

  const handleCommentSubmit = async (text) => {
    const payload = {
      createdAt: Date.now(),
      text,
      animeId,
    };
    try {
      return await dispatch(addComment(payload)).unwrap();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <h2 className={s.title}>Комментарии</h2>
      <div className={s.commentWrapper}>
        <CommentForm onCommentSubmit={handleCommentSubmit}></CommentForm>
      </div>
      {commentStatus === REQUEST_STATUSES.pending ? (
        <p className={s.commentStatus}>Идет загрузка...</p>
      ) : commentStatus === REQUEST_STATUSES.failed ? (
        <p className={s.commentStatus}>Не удалось загрузить комментарии...</p>
      ) : (
        commentStatus === REQUEST_STATUSES.success &&
        (isEmpty(commentIds) ? (
          <p className={s.commentStatus}>Коммментариев пока нет...</p>
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
