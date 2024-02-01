import React from "react";
import s from "./header.module.css";
import logo from "../../assets/images/logo-color.png";
import Button from "../Button/Button";
import { buttonColors } from "../../utils/buttonColors";
import Filters from "../Filters/Filters";
import Sort from "../Sort/Sort";
import Search from "../Search/Search";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentGenres } from "../../redux/UI/Genres/selectors";
import { selectCurrentSort } from "../../redux/UI/Sort/selectors";
import {
  selectIsAuthorized,
  selectUserData,
} from "../../redux/entities/User/selectors";

export default function Header() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const userData = useSelector(selectUserData);
  const isAuthorized = useSelector(selectIsAuthorized);
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
      <div className={s.navcontainer}>
        <ul className={s.list}>
          <li className={s.listitem}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.mainLink + " " + s.active : s.mainLink
              }
              to="/"
            >
              Аниме
            </NavLink>
          </li>
          <li className={s.listitem}>
            <Filters />
          </li>
          <li className={s.listitem}>
            <Sort />
          </li>
        </ul>
        <div className={s.searchWrapper}>
          <Search />
        </div>
        {isAuthorized ? (
          <Link to="/profile" className={s.profileLink}>
            <img
              src={userData?.avatar}
              className={s.profilePic}
              alt="аватар"
            ></img>
          </Link>
        ) : (
          <>
            <Link to="/signup" className={s.btnWrapper}>
              <Button>SIGN UP</Button>
            </Link>
            <Link to="signin">
              <Button color={buttonColors.purple}>LOG IN</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
