import React from "react";
import s from "./searchinput.module.css";

const SearchInput = React.forwardRef(function(props, ref) {
  const { value, onChange, children, placeholder, ...rest } = props;

  return (
    <div className={s.searchContainer}>
      <span className={s.searchIcon}></span>
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        className={s.search}
        placeholder={placeholder}
        {...rest}
      />
      {children}
    </div>
  );
});

export default SearchInput;
