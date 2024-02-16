import React from "react";
import s from "./passwordinput.module.css";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { ReactComponent as EyeSlashIcon } from "../../assets/images/eye-slash.svg";

export default function PasswordInput({ value, onChange, ...props }) {
  const [passwordHidden, setPasswordHidden] = React.useState(true);
  return (
    <div className={s.inputWrapper}>
      <input
        type={passwordHidden ? "password" : "text"}
        value={value}
        onChange={onChange}
        {...props}
        className={s.passwordInput}
      ></input>
      <button
        type="button"
        onClick={() => setPasswordHidden((prev) => !prev)}
        className={s.hideButton}
      >
        {passwordHidden ? <EyeIcon /> : <EyeSlashIcon />}
      </button>
    </div>
  );
}
