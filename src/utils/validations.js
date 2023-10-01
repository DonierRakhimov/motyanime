export const userNameValidations = {
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

export const emailValidations = {
  required: {
    value: true,
    message: 'Не все поля заполнены',
  },
  email: {
    value: true,
    message: 'Введен некорректный email',
  },
};

export const passwordValidations = {
  required: {
    value: true,
    message: 'Не все поля заполнены',
  },
  password: {
    value: true,
    message:
      'Ваш пароль должен состоять из не менее 8 символов латинского алфавита и включать как минимум одну заглавную букву, одну строчную букву и одну цифру',
  },
};

export const repeatPasswordValidations = {
  required: {
    value: true,
    message: 'Не все поля заполнены',
  },
};