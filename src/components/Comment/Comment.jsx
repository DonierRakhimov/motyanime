import React from 'react';
import s from './comment.module.css';
import profile from '../../assets/images/profile.png';

export default function Comment({ commentId, postForm = false, onSubmit }) {
  const submitHandler = (evt) => {
    evt.preventDefault();
    onSubmit();
  }
  return (
    <div className={s.root}>
      <img className={s.profilePic} src={profile} alt='profile' />
      <div className={s.commentContent}>
        {postForm ? (
          <form onSubmit={submitHandler}>
            <fieldset className={s.fieldset}>
              <textarea
                className={s.commentField}
                placeholder='Оставить комментарий'
                name='comment'
              />
              <button className={s.postBtn} type='submit'>
                Опубликовать
              </button>
            </fieldset>
          </form>
        ) : (
          <div className={s.commentContainer}>
            <span>@Username&nbsp;</span>
            <b>5 minutes ago</b>
            <p className={s.comment}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
