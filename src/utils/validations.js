import { VALIDATION_OPTIONS } from "./validationOptions";

export const userNameValidations = {
  [VALIDATION_OPTIONS.required]: {
    value: true,
    message: "Не все поля заполнены",
  },
  [VALIDATION_OPTIONS.minLength]: {
    value: 2,
    message: "Имя пользователя должно содержать как минимум 2 символа",
  },
  [VALIDATION_OPTIONS.maxLength]: {
    value: 30,
    message: "Имя пользователя не должно превышать 30 символов",
  },
};

export const emailValidations = {
  [VALIDATION_OPTIONS.required]: {
    value: true,
    message: "Не все поля заполнены",
  },
  [VALIDATION_OPTIONS.email]: {
    value: true,
    message: "Введен некорректный email",
  },
};

export const passwordValidations = {
  [VALIDATION_OPTIONS.required]: {
    value: true,
    message: "Не все поля заполнены",
  },
  [VALIDATION_OPTIONS.password]: {
    value: true,
    message:
      "Ваш пароль должен состоять из не менее 8 символов латинского алфавита и включать как минимум одну заглавную букву, одну строчную букву и одну цифру",
  },
};

export const repeatPasswordValidations = {
  [VALIDATION_OPTIONS.required]: {
    value: true,
    message: "Не все поля заполнены",
  },
};
