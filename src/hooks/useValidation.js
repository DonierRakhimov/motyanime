import React from 'react';
import isEmail from 'validator/lib/isEmail';

export const useValidation = (value, validations) => {
  const [validationMessage, setValidationMessage] = React.useState('');

  React.useEffect(() => {
    for (let validation in validations) {
      switch (validation) {
        case 'required': {
          if (!value?.replace(/\s/g, '').length) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case 'email': {
          if (!isEmail(value)) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case 'password': {
          if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case 'minLength': {
          if (value.length < validations[validation].value) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case 'maxLength': {
          if (value.length > validations[validation].value) {
            return setValidationMessage(validations[validation].message);
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
