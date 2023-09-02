import React from 'react';
import s from './commentlist.module.css';
import Comment from '../Comment/Comment';

export default function CommentsList({ animeId }) {
  return (
    <div>
      <h2 className={s.title}>Комментарии</h2>
      <div className={s.commentWrapper}>
        <Comment postForm={true}></Comment>
      </div>
      <div className={s.commentWrapper}>
        <Comment></Comment>
      </div>
      <div className={s.commentWrapper}>
        <Comment></Comment>
      </div>
      <div className={s.commentWrapper}>
        <Comment></Comment>
      </div>
      <div className={s.commentWrapper}>
        <Comment></Comment>
      </div>
      <div className={s.commentWrapper}>
        <Comment></Comment>
      </div>
    </div>
  );
}
