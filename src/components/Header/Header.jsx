import React from "react";
import s from "./header.module.css";
import logo from "../../assets/images/logo-color.png";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentGenres } from "../../redux/UI/Genres/selectors";
import { selectCurrentSort } from "../../redux/UI/Sort/selectors";

import { ReactComponent as BurgerIcon } from "../../assets/images/bars.svg";
import NavList from "../NavList/NavList";
import classNames from "classnames";

export default function Header() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const currentGenres = useSelector(selectCurrentGenres);
  const currentSort = useSelector(selectCurrentSort);

  React.useEffect(() => {
    if (pathname === "/") {
      if (currentGenres.length) {
        searchParams.set("genres", currentGenres.join(","));
      } else if (searchParams.get("genres")) {
        searchParams.delete("genres");
      }

      if (currentSort) {
        searchParams.set("sort", currentSort);
      }
    }
    setSearchParams(searchParams.toString());
  }, [pathname, currentGenres, searchParams, currentSort, setSearchParams]);

  return (
    <header className={s.root}>
      <img src={logo} alt="логотип" className={s.logo} />
      <button
        className={s.burger}
        onClick={() => setMenuIsOpen((prev) => !prev)}
      >
        <BurgerIcon></BurgerIcon>
      </button>
      <div className={classNames(s.navWrapper, menuIsOpen ? s.navWrapperOpen : "")}>
        <nav className={s.navcontainer}>
          <NavList></NavList>
        </nav>
      </div>
    </header>
  );
}
