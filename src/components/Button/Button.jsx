import React from 'react';
import { buttonSizes } from '../../utils/buttonSizes';
import s from './button.module.css';
import classNames from 'classnames';
import { buttonColors } from '../../utils/buttonColors';

export default function Button({
  className = '',
  color = buttonColors.yellow,
  children,
  onClick = () => {
    return;
  },
  size = buttonSizes.m,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={classNames(s.btn, s[color], s[size], className)}
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={s.childContainer}>{children}</div>
    </button>
  );
}
