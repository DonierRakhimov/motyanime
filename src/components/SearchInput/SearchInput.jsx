import React from "react";
import s from "./searchinput.module.css";
import classNames from "classnames";

const SearchInput = React.forwardRef(function(props, ref) {
  const { value, onChange, children, placeholder, className, ...rest } = props;

  return (
    <div className={s.searchContainer}>
      <span className={s.searchIcon}></span>
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        className={classNames(s.search, className)}
        placeholder={placeholder}
        {...rest}
      />
      {children}
    </div>
  );
});

export default SearchInput;
