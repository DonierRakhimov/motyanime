import React from "react";
import s from "./profile.module.css";
import Button from "../Button/Button";
import { buttonSizes } from "../../utils/buttonSizes";
import { ReactComponent as LogoutIcon } from "../../assets/images/logoutIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/images/editProfile.svg";
import { useForm } from "../../hooks/useForm";
import { emailValidations, userNameValidations } from "../../utils/validations";
import { useValidation } from "../../hooks/useValidation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash.isempty";
import { logoutUser } from "../../redux/entities/User/thunks/logoutUser";
import { updateUser } from "../../redux/entities/User/thunks/updateUser";

export default function Profile({ userData }) {
  const formRef = React.useRef(null);
  const avatarInputRef = React.useRef(null);
  const coverInputRef = React.useRef(null);
  const [avatarLink, setAvatarLink] = React.useState("");
  const [coverLink, setCoverLink] = React.useState("");
  const [editIsOpen, setEditIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { formData, handleChange, setFormData } = useForm(userData);
  const [userNameError] = useValidation(formData.userName, userNameValidations);
  const [emailError] = useValidation(formData.email, emailValidations);
  const [formError, setFormError] = React.useState("");
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
      await dispatch(logoutUser()).unwrap();
      navigate("/");
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
      avatarInputRef.current.files.length === 0 &&
      coverInputRef.current.files.length === 0
    ) {
      setFormError("Введите новые данные");
    } else {
      try {
        const formData = new FormData(formRef.current);
        setFormError("");
        setIsSubmitting(true);
        await dispatch(updateUser(formData)).unwrap();
      } catch (err) {
        if (err.status === 409) {
          setFormError("Пользователь с таким email уже существует");
        } else if (err.status === 400) {
          setFormError("Переданы некорректные данные");
        }
      } finally {
        setIsSubmitting(false);
        setAvatarLink("");
        setCoverLink("");
        avatarInputRef.current.value = "";
        coverInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const { name } = e.target;

    if (isEmpty(files)) {
      return;
    }

    if (!files[0].type.startsWith("image/")) {
      setFormError("Некорректный формат файла");
      e.target.value = "";
    } else {
      setFormError("");
      const url = URL.createObjectURL(files[0]);
      if (name === "avatar") {
        setAvatarLink(url);
      } else {
        setCoverLink(url);
      }
    }
  };

  return (
    <div className={s.root}>
      <div
        className={s.coverContainer}
        style={{
          backgroundImage: `url(${coverLink || cover})`,
        }}
      >
        <label
          className={s.editCoverLabel}
          style={{
            display: editIsOpen ? "block" : "none",
          }}
        >
          <input
            ref={coverInputRef}
            className={s.editCoverInput}
            type="file"
            name="cover"
            form="edit-form"
            onChange={handleFileChange}
            accept="image/*"
          ></input>
          Редактировать обложку
        </label>
      </div>
      <div className={s.profileInfo}>
        <div className={s.pictureWrapper}>
          <label
            className={s.pictureLabel}
            style={{
              display: editIsOpen ? "block" : "none",
            }}
          >
            <EditIcon></EditIcon>
            <input
              className={s.pictureInput}
              type="file"
              name="avatar"
              form="edit-form"
              ref={avatarInputRef}
              onChange={handleFileChange}
              accept="image/*"
            ></input>
          </label>
          <img
            src={avatarLink || avatar}
            className={s.profilePic}
            alt="Изображение профиля"
          ></img>
        </div>
        <div className={s.infoContainer}>
          <div className={s.userData}>
            <p className={s.userName}>{userName}</p>
            <p className={s.email}>{email}</p>
            <button
              onClick={() => handleLogout()}
              className={s.logoutBtn}
              title="Выйти из аккаунта"
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
        className={s.profileFormWrapper}
        style={{
          height: editIsOpen ? formRef.current?.clientHeight : 0,
          paddingBottom: editIsOpen ? 20 : 0,
        }}
      >
        <form
          id="edit-form"
          className={s.editForm}
          ref={formRef}
          onSubmit={handleUserUpdate}
        >
          <label className={s.editLabel}>
            Имя пользователя
            <input
              className={s.editInput}
              type="text"
              placeholder="Имя пользователя"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            ></input>
          </label>
          <label className={s.editLabel}>
            Email
            <input
              className={s.editInput}
              type="email"
              placeholder="Email"
              name="email"
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
  );
}
