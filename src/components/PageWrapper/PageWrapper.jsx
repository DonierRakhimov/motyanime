import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Notification from '../Notification/Notification';
import s from './pagewrapper.module.css'

export default function PageWrapper() {
  return (
    <>
      <div className={s.headerWrapper}>
        <Header />
      </div>
      <Outlet></Outlet>
      <Notification></Notification>
    </>
  );
}
