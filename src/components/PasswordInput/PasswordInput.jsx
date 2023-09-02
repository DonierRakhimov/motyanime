import React from 'react';
import s from './passwordinput.module.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PasswordInput({ value, onChange, ...props }) {
  const [passwordHidden, setPasswordHidden] = React.useState(true);
  return (
    <div className={s.inputWrapper}>
      <input
        type={passwordHidden ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        {...props}
      ></input>
      <button
        type='button'
        onClick={() => setPasswordHidden((prev) => !prev)}
        className={s.hideButton}
      >
        <FontAwesomeIcon icon={passwordHidden ? faEye : faEyeSlash} />
      </button>
    </div>
  );
}
