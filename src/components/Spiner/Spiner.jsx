import React from 'react';
import s from './spiner.module.css';
import classNames from 'classnames';

export default function Spiner({ isActive }) {
  return (
    <div className={classNames(s['lds-default'], isActive ? s.active : '')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
