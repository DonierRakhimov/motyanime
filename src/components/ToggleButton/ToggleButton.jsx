import React from 'react';
import { ReactComponent as DropdownToggle } from '../../assets/images/dropdown-toggle.svg';
import s from './togglebutton.module.css';
import DropDown from '../Dropdown/Dropdown'
import classNames from 'classnames';

export default function ToggleButton({ className = '', children }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  return (
    <div className={classNames(s.root, className)}>
      <button onClick={() => setDropdownOpen((prev) => !prev)} className={s.dropdownToggle}>
        <DropdownToggle />
      </button>
      {dropdownOpen && <DropDown>{children}</DropDown>}
    </div>
  );
}
