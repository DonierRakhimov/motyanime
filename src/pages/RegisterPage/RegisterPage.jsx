import React from 'react';
import Form from '../../components/Form/Form';
import s from './registerpage.module.css';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/entities/User/thunks/registerUser';
import { useNavigate } from 'react-router-dom';

const initialState = {
  userName: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export default function RegisterPage() {
  const { formData, handleChange } = useForm(initialState);
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
      message: 'Имя пользователя не должно превышать 30 символов'
    }
  });
  const [emailError] = useValidation(formData.email, {
    required: {
      value: true,
      message: 'Не все поля заполнены',
    },
    email: {
      value: true,
      message: 'Введен некорректный email',
    },
  });
  const [passwordError] = useValidation(formData.password, {
    required: {
      value: true,
      message: 'Не все поля заполнены',
    },
    password: {
      value: true,
      message:
        'Ваш пароль должен состоять из не менее 8 символов латинского алфавита и включать как минимум одну заглавную букву, одну строчную букву и одну цифру',
    },
  });
  const [repeatPasswordError] = useValidation(formData.repeatPassword, {
    required: {
      value: true,
      message: 'Не все поля заполнены',
    },
  });

  const [formError, setFormError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    const errorMessage = [
      userNameError,
      emailError,
      passwordError,
      repeatPasswordError,
    ].find((error) => error);

    if (errorMessage) {
      setFormError(errorMessage);
    } else if (formData.password !== formData.repeatPassword) {
      setFormError('Пароли не совпадают');
    } else {
      try {
        setFormError('');
        setIsSubmitting(true);
        const result = await dispatch(registerUser(formData));
        if (result) {
          navigate('/profile');
        }
      } catch (err) {
        setFormError(err.message);
      } finally {
        setIsSubmitting(false);
      }
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
        submitMessage={formError}
        isSubmitting={isSubmitting}
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
