import React from 'react';
import s from './loginpage.module.css';
import Form from '../../components/Form/Form';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { useForm } from '../../hooks/useForm';
import { useValidation } from '../../hooks/useValidation';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../redux/entities/User/thunks/signInUser';
import { emailValidations, passwordValidations } from '../../utils/validations';

const initialState = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const { formData, handleChange } = useForm(initialState);
  const [emailError] = useValidation(formData.email, emailValidations);
  const [passwordError] = useValidation(formData.password, passwordValidations);

  const [formValidationError, setFormValidationError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const errorMessage = [emailError, passwordError].find((error) => error);

    if (errorMessage) {
      setFormValidationError(errorMessage);
    } else {
      try {
        setIsSubmitting(true);
        setFormValidationError('');
        const result = await dispatch(signInUser(formData));
        if (result) {
          navigate('/profile');
        }
      } catch (err) {
        setFormValidationError(err.message);
      } finally {
        setIsSubmitting(false);
      }
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
        isSubmitting={isSubmitting}
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
