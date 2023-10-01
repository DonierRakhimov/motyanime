import React from 'react';
import s from './profile.module.css';
import PlayList from '../../components/PlayList/PlayList';
import { useSelector } from 'react-redux';
import {
  selectPlannedAnimes,
  selectUserData,
  selectWatchedAnimes,
} from '../../redux/entities/User/selectors';
import Profile from '../../components/Profile/Profile';

export default function ProfilePage() {
  const userData = useSelector(selectUserData);
  const plannedAnimes = useSelector(selectPlannedAnimes);
  const watchedAnimes = useSelector(selectWatchedAnimes);

  return (
    <section className={s.root}>
      <h1 className={s.profileTitle}>Мой профиль</h1>
      <Profile userData={userData}></Profile>
      <div className={s.playListWrapper}>
        <PlayList
          watchedList={watchedAnimes}
          plannedList={plannedAnimes}
        ></PlayList>
      </div>
    </section>
  );
}
