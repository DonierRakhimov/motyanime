import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { VALIDATION_OPTIONS } from '../utils/validationOptions';

export const useValidation = (value, validations) => {
  const [validationMessage, setValidationMessage] = React.useState('');

  React.useEffect(() => {
    for (let validation in validations) {
      switch (validation) {
        case VALIDATION_OPTIONS.required: {
          if (!value?.replace(/\s/g, '').length) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case VALIDATION_OPTIONS.email: {
          if (!isEmail(value)) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case VALIDATION_OPTIONS.password: {
          if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case VALIDATION_OPTIONS.minLength: {
          if (value.length < validations[validation].value) {
            return setValidationMessage(validations[validation].message);
          } else {
            setValidationMessage('');
          }
          break;
        }
        case VALIDATION_OPTIONS.maxLength: {
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
