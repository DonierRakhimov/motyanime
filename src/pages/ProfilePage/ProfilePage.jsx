import React from 'react';
import s from './profile.module.css';
import profilePicture from '../../assets/images/profile.png';
import Button from '../../components/Button/Button';
import { buttonColors } from '../../utils/buttonColors';
import { buttonSizes } from '../../utils/buttonSizes';
import cover from '../../assets/images/cover.avif';
import PlayList from '../../components/PlayList/PlayList';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlannedAnimes, selectUserData, selectWatchedAnimes } from '../../redux/entities/User/selectors';
import isEmpty from 'lodash.isempty';
import { ReactComponent as LogoutIcon } from '../../assets/images/logoutIcon.svg';
import { logoutUser } from '../../redux/entities/User/thunks/logoutUser';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { updateUser } from '../../redux/entities/User/thunks/updateUser';
import { notificationToggled } from '../../redux/UI/Notification/actionCreators';

export default function ProfilePage() {
  const formRef = React.useRef(null);
  const [editIsOpen, setEditIsOpen] = React.useState(false);
  const userData = useSelector(selectUserData);
  const plannedAnimes = useSelector(selectPlannedAnimes);
  const watchedAnimes = useSelector(selectWatchedAnimes);
  const { formData, handleChange, setFormData } = useForm(userData);
  const [userNameError] = useValidation(formData.userName, {
    required: {
      value: true,
      message: 'Не все поля заполнены',
    },
    minLength: {
      value: 2,
      message: 'Имя пользователя должно содержать как минимум 2 символа',
    },
    maxLength: {
      value: 30,
      message: 'Имя пользователя не должно превышать 30 символов',
    },
  });
  const [emailError] = useValidation(formData.email, {
    required: {
      value: true,
      message: 'Не все поля заполнены',
    },
    email: {
      value: true,
      message: 'Введите корректный email'
    }
  });
  const [formError, setFormError] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setFormData(userData);
  }, [userData, setFormData])

  if (isEmpty(userData)) {
    return;
  }

  const { userName, email } = userData;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const errorMessage = [userNameError, emailError].find((error) => error);

    if (errorMessage) {
      setFormError(errorMessage)
    } else if (formData.email === userData.email && formData.userName === userData.userName) {
      setFormError('Введите новое имя пользователя или email')
    } else {
      setFormError('');
      try {
        await dispatch(updateUser(formData));
        dispatch(notificationToggled({color: 'green', message: 'Профиль успешно обновлён!'}))
      } catch (err) {
        setFormError(err.message);
      }
    }
  }

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
              <p className={s.userName}>{userName}</p>
              <p className={s.email}>{email}</p>
              <button
                onClick={() => handleLogout()}
                className={s.logoutBtn}
                title='Выйти из аккаунта'
              >
                <LogoutIcon></LogoutIcon>
              </button>
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
          <form className={s.editForm} ref={formRef} onSubmit={handleUserUpdate}>
            <label className={s.editLabel}>
              Имя пользователя
              <input
                className={s.editInput}
                type='text'
                placeholder='Имя пользователя'
                name='userName'
                value={formData.userName}
                onChange={handleChange}
              ></input>
            </label>
            <label className={s.editLabel}>
              Email
              <input
                className={s.editInput}
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              ></input>
            </label>
            <Button className={s.saveBtn}>Сохранить изменения</Button>
            <span className={s.errorMessage}>{formError}</span>
          </form>
        </div>
      </div>
      <div className={s.playListWrapper}>
        <PlayList
          watchedList={watchedAnimes}
          plannedList={plannedAnimes}
        ></PlayList>
      </div>
    </section>
  );
}
