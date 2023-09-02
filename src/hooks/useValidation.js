import React from 'react';
import isEmail from 'validator/lib/isEmail';

export const useValidation = (value, validations) => {
  const [validationMessage, setValidationMessage] = React.useState('');

  React.useEffect(() => {
    for (let validation in validations) {
      switch (validation) {
        case 'required': {
          if (!value?.replace(/\s/g, '').length) {
            return setValidationMessage('Не все поля заполнены');
          } else {
            setValidationMessage('');
          }
          break;
        }
        case 'email': {
          if (!isEmail(value)) {
            return setValidationMessage('Введен некорректный email');
          } else {
            setValidationMessage('');
          }
          break;
        }
        case 'password': {
          if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)) {
            return setValidationMessage(
              'Ваш пароль должен состоять из не менее 8 символов и включать как минимум одну заглавную букву, одну строчную букву и одну цифру.'
            );
          } else {
            setValidationMessage('');
          }
          break;
        }
        default:
          break;
      }
    }
  }, [validations, value]);

  return [validationMessage, setValidationMessage];
};
