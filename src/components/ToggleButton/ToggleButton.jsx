import React from 'react';
import { ReactComponent as DropdownToggle } from '../../assets/images/dropdown-toggle.svg';
import { ReactComponent as CheckIcon } from '../../assets/images/check.svg';
import { ReactComponent as ClockIcon } from '../../assets/images/clock.svg'
import s from './togglebutton.module.css';
import DropDown from '../Dropdown/Dropdown';
import classNames from 'classnames';
import { usePopup } from '../../hooks/usePopup';
import { useDispatch, useSelector } from 'react-redux';
import { saveAnime } from '../../redux/entities/User/thunks/saveAnime';
import { selectIsPlanned, selectIsWatched } from '../../redux/entities/User/selectors';

export default function ToggleButton({ className = '', title = {} }) {
  const [dropdownOpen, setDropdownOpen] = usePopup('.' + s.root);
  const isWatched = useSelector((state) => selectIsWatched(state, title.id));
  const isPlanned = useSelector((state) => selectIsPlanned(state, title.id));
  const dispatch = useDispatch();

  const handleAnimeSave = (category) => {
    dispatch(saveAnime(title, category));
  }
  
  return (
    <div className={classNames(s.root, className)}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={s.dropdownToggle}
      >
        <DropdownToggle />
      </button>
      <DropDown isOpen={dropdownOpen}>
        <button
          className={classNames(s.addBtn, isWatched ? s.active : '')}
          onClick={() => handleAnimeSave('watched')}
        >
          <CheckIcon></CheckIcon>
          Просмотренно
        </button>
        <button
          className={classNames(s.addBtn, isPlanned ? s.active : '')}
          onClick={() => handleAnimeSave('planned')}
        >
          <ClockIcon></ClockIcon>
          Запланированно
        </button>
      </DropDown>
    </div>
  );
}
