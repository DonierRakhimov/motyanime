import React from 'react';
import s from './dropdown.module.css';
import classNames from 'classnames';

export default function DropDown({ className = '', children, isOpen }) {
  return <div className={classNames(s.root, className, isOpen ? s.open : '')}>
    {children}
  </div>;
}
