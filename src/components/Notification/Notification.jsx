import React from 'react';
import s from './notification.module.css';
import classNames from 'classnames';

export default function Notification({
  isShown = false,
  messageText = '',
  color = 'red',
  coords = {
    top: 0,
    left: 0,
  },
}) {
  return (
    <div
      className={classNames(s.root, isShown ? s.active : '')}
      style={{
        backgroundColor: color,
        ...coords
      }}
    >
      <p className={s.message}>{messageText}</p>
    </div>
  );
}
