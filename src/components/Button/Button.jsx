import React from 'react';
import { buttonSizes } from '../../utils/buttonSizes';
import styles from './button.module.css';
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
  ...props
}) {
  return (
    <button
      className={classNames(styles.btn, styles[color], styles[size], className)}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
