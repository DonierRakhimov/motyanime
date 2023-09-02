import React from 'react';
import Form from '../../components/Form/Form';
import s from './registerpage.module.css';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';

const initialState = {
  userName: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export default function RegisterPage() {
  const { formData, handleChange } = useForm(initialState);
  const [userNameError] = useValidation(formData.userName, {
    required: true,
  });
  const [emailError] = useValidation(formData.email, {
    email: true,
    required: true,
  });
  const [passwordError] = useValidation(formData.password, {
    required: true,
    password: true,
  });
  const [repeatPasswordError] = useValidation(formData.repeatPassword, {
    required: true,
  });

  const [formValidationError, setFormValidationError] = React.useState('');

  const handleRegister = () => {
    const errorMessage = [
      userNameError,
      emailError,
      passwordError,
      repeatPasswordError,
    ].find((error) => error);

    if (errorMessage) {
      setFormValidationError(errorMessage);
    } else if (formData.password !== formData.repeatPassword) {
      setFormValidationError('Пароли не совпадают');
    } else {
      setFormValidationError('');
    }
  };

  return (
    <div className={s.root}>
      <Form
        title='Регистрация'
        submitText='Зарегистрироваться'
        navigationText='Уже есть аккаунт?'
        anchorText='Вход'
        navigationRoute='/signin'
        onSubmit={handleRegister}
        submitMessage={formValidationError}
      >
        <input
          value={formData.userName}
          name='userName'
          type='text'
          placeholder='Имя пользователя'
          onChange={handleChange}
        ></input>
        <input
          value={formData.email}
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        ></input>
        <PasswordInput
          value={formData.password}
          name='password'
          placeholder='Пароль'
          onChange={handleChange}
        />
        <PasswordInput
          value={formData.repeatPassword}
          name='repeatPassword'
          placeholder='Повторите пароль'
          onChange={handleChange}
        />
      </Form>
    </div>
  );
}
