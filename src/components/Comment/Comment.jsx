import React from 'react';
import s from './comment.module.css';
import profile from '../../assets/images/profile.png';
import { useSelector } from 'react-redux';
import { selectCommentById } from '../../redux/entities/Comment/selectors';
import { selectCommentOwnerById } from '../../redux/entities/CommentOwner/selectors';
import isEmpty from 'lodash.isempty';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Comment({ commentId }) {
  const comment = useSelector((state) => selectCommentById(state, commentId));
  const commentOwner = useSelector((state) =>
    selectCommentOwnerById(state, comment?.owner)
  );

  if (isEmpty(comment)) {
    return;
  }

  const { text, createdAt } = comment;
  const { userName } = commentOwner;

  return (
    <div className={s.root}>
      <img className={s.profilePic} src={profile} alt='profile' />
      <div className={s.commentContent}>
        <div className={s.commentContainer}>
          <span>{userName}&nbsp;</span>
          <b>{formatDistanceToNow(new Date(createdAt)) + ' ago'}</b>
          <p className={s.comment}>{text}</p>
        </div>
      </div>
    </div>
  );
}
