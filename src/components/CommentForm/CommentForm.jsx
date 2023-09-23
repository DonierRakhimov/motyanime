import React from 'react';
import s from './commentform.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAuthorized,
  selectUserData,
} from '../../redux/entities/User/selectors';
import { focusGained, focusLost } from '../../redux/UI/commentFormFocus/actionCreators';

export default function CommentForm({
  onCommentSubmit = () => {
    return;
  },
}) {
  const userData = useSelector(selectUserData);
  const isAuthorized = useSelector(selectIsAuthorized);
  const [commentText, setCommentText] = React.useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    onCommentSubmit(commentText);
  };

  return (
    <div className={s.root}>
      {isAuthorized && (
        <img className={s.profilePic} src={userData?.avatar} alt='аватар пользователя' />
      )}
      <div className={s.commentContent}>
        <form onSubmit={submitHandler}>
          <fieldset className={s.fieldset}>
            <textarea
              onFocus={() => dispatch(focusGained())}
              onBlur={() => dispatch(focusLost())}
              className={s.commentField}
              placeholder='Оставить комментарий'
              name='comment'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className={s.postBtn} type='submit'>
              Опубликовать
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
