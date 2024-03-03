import React from "react";
import s from "./savebutton.module.css";
import classNames from "classnames";
import DropDown from "../Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CheckIcon } from "../../assets/images/check.svg";
import { ReactComponent as ClockIcon } from "../../assets/images/clock.svg";
import { ReactComponent as DropdownToggle } from "../../assets/images/dropdown-toggle.svg";
import { usePopup } from "../../hooks/usePopup";
import { saveAnime } from "../../redux/entities/User/thunks/saveAnime";
import {
  selectIsPlanned,
  selectIsWatched,
} from "../../redux/entities/User/selectors";

export default function SaveButton({ className = "", anime = {} }) {
  const [dropdownOpen, setDropdownOpen] = usePopup("." + s.root);
  const isWatched = useSelector((state) => selectIsWatched(state, anime._id));
  const isPlanned = useSelector((state) => selectIsPlanned(state, anime._id));
  const dispatch = useDispatch();

  const handleAnimeSave = (category) => {
    dispatch(saveAnime({ anime, category }));
  };

  return (
    <div className={classNames(s.root, className)}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={s.dropdownToggle}
      >
        <DropdownToggle />
      </button>
      <DropDown isOpen={dropdownOpen} className={s.saveDropdown}>
        <button
          className={classNames(s.addBtn, isWatched ? s.active : "")}
          onClick={() => handleAnimeSave("watched")}
        >
          <CheckIcon></CheckIcon>
          Просмотренно
        </button>
        <button
          className={classNames(s.addBtn, isPlanned ? s.active : "")}
          onClick={() => handleAnimeSave("planned")}
        >
          <ClockIcon></ClockIcon>
          Запланированно
        </button>
      </DropDown>
    </div>
  );
}
