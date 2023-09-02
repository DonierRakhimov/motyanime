import React from 'react';
import s from './profile.module.css';
import profilePicture from '../../assets/images/profile.png';
import Button from '../../components/Button/Button';
import { buttonColors } from '../../utils/buttonColors';
import { buttonSizes } from '../../utils/buttonSizes';
import cover from '../../assets/images/cover.avif';

export default function ProfilePage() {
  const [editIsOpen, setEditIsOpen] = React.useState(false);
  const formRef = React.useRef(null);
  return (
    <section className={s.root}>
      <h1 className={s.profileTitle}>Мой профиль</h1>
      <div className={s.profileContainer}>
        <div
          className={s.coverContainer}
          style={{
            backgroundImage: `url(${cover})`,
          }}
        >
          <Button
            className={s.editCoverBtn}
            color={buttonColors.grey}
            size={buttonSizes.s}
          >
            Редактировать обложку
          </Button>
        </div>
        <div className={s.profileInfo}>
          <div className={s.pictureWrapper}>
            <img
              src={profilePicture}
              className={s.profilePic}
              alt='Изображение профиля'
            ></img>
          </div>
          <div className={s.infoContainer}>
            <div>
              <p className={s.userName}>XYX USER</p>
              <p className={s.email}>youremail@example.com</p>
            </div>
            <Button
              className={s.editBtn}
              size={buttonSizes.m}
              onClick={() => setEditIsOpen((prev) => !prev)}
            >
              Редактировать профиль
            </Button>
          </div>
        </div>
        <div
          className={s.editFormContainer}
          style={{
            height: editIsOpen ? formRef.current?.clientHeight : 0,
            paddingBottom: editIsOpen ? 20 : 0,
          }}
        >
          <form className={s.editForm} ref={formRef}>
            <label className={s.editLabel}>
              Новый никнейм
              <input
                className={s.editInput}
                type='text'
                placeholder='Имя пользователя'
              ></input>
            </label>
            <label className={s.editLabel}>
              Новый email
              <input
                className={s.editInput}
                type='email'
                placeholder='email'
              ></input>
            </label>
            <Button className={s.saveBtn}>Сохранить изменения</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
