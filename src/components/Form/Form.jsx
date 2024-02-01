import React from "react";
import s from "./form.module.css";
import Button from "../Button/Button";
import { buttonSizes } from "../../utils/buttonSizes";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../../assets/images/profile.svg";
import { buttonColors } from "../../utils/buttonColors";
import classNames from "classnames";

export default function Form({
  onSubmit = (evt) => {
    return;
  },
  title,
  children,
  submitText,
  navigationText,
  navigationRoute = "/",
  anchorText,
  submitMessage,
  theme = "yellow",
  isSubmitting = false,
}) {
  const submitHandler = (evt) => {
    evt.preventDefault();
    onSubmit(evt);
  };
  return (
    <div className={s.root}>
      <div className={s.formContainer}>
        <ProfileIcon
          className={s.profilePic}
          style={{
            fill:
              theme === "yellow"
                ? "var(--color-primary)"
                : "var(--color-purple)",
          }}
        ></ProfileIcon>
        <h3 className={s.title}>{title}</h3>
        <form onSubmit={submitHandler} className={s.form} noValidate={true}>
          <fieldset className={s.formContent}>
            {children}
            <Button
              disabled={isSubmitting}
              color={
                theme === "yellow" ? buttonColors.yellow : buttonColors.purple
              }
              size={buttonSizes.l}
              className={s.submitBtn}
            >
              {submitText}
            </Button>
          </fieldset>
          {submitMessage && <p className={s.submitMessage}>{submitMessage}</p>}
        </form>
        <p className={s.guide}>
          {navigationText}&nbsp;
          <Link
            to={navigationRoute}
            className={classNames(s.ref, theme !== "yellow" ? s.purple : "")}
          >
            {anchorText}
          </Link>
        </p>
      </div>
    </div>
  );
}
