import React from 'react';
import s from './loginpage.module.css';
import Form from '../../components/Form/Form';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';

const initialState = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const { formData, handleChange } = useForm(initialState);
  const [emailError] = useValidation(formData.email, {
    required: true,
    email: true,
  });
  const [passwordError] = useValidation(formData.password, {
    required: true,
    password: true,
  });

  const [formValidationError, setFormValidationError] = React.useState('');

  const handleLogin = () => {
    const errorMessage = [emailError, passwordError].find((error) => error);

    if (errorMessage) {
      setFormValidationError(errorMessage);
    } else {
      setFormValidationError('');
    }
  };

  return (
    <div className={s.root}>
      <Form
        title='Вход'
        submitText='Войти'
        navigationText='Нет аккаунта?'
        anchorText='Регистрация'
        navigationRoute='/signup'
        submitMessage={formValidationError}
        onSubmit={handleLogin}
        theme='purple'
      >
        <input
          value={formData.email}
          onChange={handleChange}
          name='email'
          type='email'
          placeholder='Email'
        />
        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          name='password'
          placeholder='Пароль'
        />
      </Form>
    </div>
  );
}
