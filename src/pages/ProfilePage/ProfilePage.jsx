import React from 'react';
import s from './profile.module.css';
import Button from '../../components/Button/Button';
import { buttonColors } from '../../utils/buttonColors';
import { buttonSizes } from '../../utils/buttonSizes';
import PlayList from '../../components/PlayList/PlayList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlannedAnimes,
  selectUserData,
  selectWatchedAnimes,
} from '../../redux/entities/User/selectors';
import isEmpty from 'lodash.isempty';
import { ReactComponent as LogoutIcon } from '../../assets/images/logoutIcon.svg';
import { logoutUser } from '../../redux/entities/User/thunks/logoutUser';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { updateUser } from '../../redux/entities/User/thunks/updateUser';
import { ReactComponent as EditIcon } from '../../assets/images/editProfile.svg';

const userNameValidations = {
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
};

const emailValidations = {
  required: {
    value: true,
    message: 'Не все поля заполнены',
  },
  email: {
    value: true,
    message: 'Введите корректный email',
  },
};

export default function ProfilePage() {
  const formRef = React.useRef(null);
  const avatarRef = React.useRef(null);
  const [avatarLink, setAvatarLink] = React.useState('');
  const [coverLink, setCoverLink] = React.useState('');
  const coverRef = React.useRef(null);
  const [editIsOpen, setEditIsOpen] = React.useState(false);
  const userData = useSelector(selectUserData);
  const plannedAnimes = useSelector(selectPlannedAnimes);
  const watchedAnimes = useSelector(selectWatchedAnimes);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { formData, handleChange, setFormData } = useForm(userData);
  const [userNameError] = useValidation(formData.userName, userNameValidations);
  const [emailError] = useValidation(formData.email, emailValidations);
  const [formError, setFormError] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setFormData(userData);
  }, [userData, setFormData]);

  if (isEmpty(userData)) {
    return;
  }

  const { userName, email, cover, avatar } = userData;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/');
    } catch (err) {
      return;
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const errorMessage = [userNameError, emailError].find((error) => error);

    if (errorMessage) {
      setFormError(errorMessage);
    } else if (
      formData.email === userData.email &&
      formData.userName === userData.userName &&
      avatarRef.current.files.length === 0 &&
      coverRef.current.files.length === 0
    ) {
      setFormError('Введите новые данные');
    } else {
      try {
        const formData = new FormData(formRef.current);
        setFormError('');
        setIsSubmitting(true);
        await dispatch(updateUser(formData));
        setAvatarLink('');
        setCoverLink('');
        avatarRef.current.value = '';
        coverRef.current.value = '';
      } catch (err) {
        setFormError(err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const { name } = e.target;

    if (isEmpty(files)) {
      return;
    } 

    if (!(files[0].type.startsWith('image/'))) {
      setFormError('Некорректный формат файла');
      e.target.value = '';
    } else {
      setFormError('');
      const url = URL.createObjectURL(files[0]);
      if (name === 'avatar') {
        setAvatarLink(url);
      } else {
        setCoverLink(url);
      }
    }
  };

  return (
    <section className={s.root}>
      <h1 className={s.profileTitle}>Мой профиль</h1>
      <div className={s.profileContainer}>
        <div
          className={s.coverContainer}
          style={{
            backgroundImage: `url(${coverLink || cover})`,
          }}
        >
          {editIsOpen && (
            <label className={s.editCoverLabel}>
              <input
                ref={coverRef}
                className={s.editCoverInput}
                type='file'
                name='cover'
                form='edit-form'
                onChange={handleFileChange}
                accept='image/*'
              ></input>
              Редактировать обложку
            </label>
          )}
        </div>
        <div className={s.profileInfo}>
          <div className={s.pictureWrapper}>
            {editIsOpen && (
              <label className={s.pictureLabel}>
                {<EditIcon></EditIcon>}
                <input
                  className={s.pictureInput}
                  type='file'
                  name='avatar'
                  form='edit-form'
                  ref={avatarRef}
                  onChange={handleFileChange}
                  accept='image/*'
                ></input>
              </label>
            )}
            <img
              src={avatarLink || avatar}
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
          <form
            id='edit-form'
            className={s.editForm}
            ref={formRef}
            onSubmit={handleUserUpdate}
          >
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
            <Button className={s.saveBtn} disabled={isSubmitting}>
              Сохранить изменения
            </Button>
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
