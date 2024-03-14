import React from "react";
import s from "./navlist.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Filters from "../Filters/Filters";
import Sort from "../Sort/Sort";
import Search from "../Search/Search";
import Button from "../Button/Button";
import { buttonColors } from "../../utils/buttonColors";
import { useSelector } from "react-redux";
import {
  selectIsAuthorized,
  selectUserData,
} from "../../redux/entities/User/selectors";

export default function NavList() {
  const userData = useSelector(selectUserData);
  const isAuthorized = useSelector(selectIsAuthorized);
  const navigate = useNavigate();

  return (
    <>
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
          <Button className={s.btnWrapper} onClick={() => navigate("/signup")}>
            SIGN UP
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            color={buttonColors.purple}
          >
            LOG IN
          </Button>
        </>
      )}
    </>
  );
}
