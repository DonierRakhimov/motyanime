import React from 'react'
import s from './notfoundpage.module.css';
import { ReactComponent as SadIcon } from '../../assets/images/sad.svg';

export default function NotFoundPage() {
  return (
    <div className={s.root}>
        <SadIcon className={s.sadIcon}></SadIcon>
        <h1 className={s.title}>Страница не найдена...</h1>
    </div>
  )
}
