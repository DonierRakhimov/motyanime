import React from "react";
import s from "./sort.module.css";
import DropDown from "../Dropdown/Dropdown";
import { selectCurrentSort } from "../../redux/UI/Sort/selectors";
import { useDispatch, useSelector } from "react-redux";
import { sortSelected } from "../../redux/UI/Sort/sortSlice";
import { usePopup } from "../../hooks/usePopup";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { animesReseted } from "../../redux/entities/Anime/animeSlice";
import { ReactComponent as MarkIcon } from "../../assets/images/marked.svg";
import classNames from "classnames";

const sortVariants = {
  "names.ru": "По названию",
  "season.year": "По дате выхода",
};

export default function Sort() {
  const [sortIsOpen, setSortIsOpen] = usePopup("#sort");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const currentSort = useSelector(selectCurrentSort);
  const location = useLocation();
  const navigate = useNavigate();

  const sortChangeHandler = (sortParam) => {
    window.scrollTo(0, 0);
    dispatch(animesReseted());
    dispatch(sortSelected(sortParam));
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  React.useEffect(() => {
    const sortQueryParam = searchParams.get("sort");
    if (sortQueryParam) {
      dispatch(sortSelected(sortQueryParam));
    }
  }, [searchParams, dispatch]);

  return (
    <div className={s.root} id="sort">
      <button
        className={s.sortToggle}
        onClick={() => {
          setSortIsOpen((prev) => !prev);
        }}
      >
        Сортировка
      </button>
      <DropDown className={s.sortDropdown} isOpen={sortIsOpen}>
        {Object.keys(sortVariants).map((sortParam, index) => (
          <div className={s.sortBtnWrapper} key={index}>
            <button
              className={s.sortBtn}
              onClick={() => sortChangeHandler(sortParam)}
            >
              {sortVariants[sortParam]}
            </button>
            <MarkIcon
              className={classNames(
                s.markIcon,
                currentSort === sortParam ? s.marked : ""
              )}
            ></MarkIcon>
          </div>
        ))}
      </DropDown>
    </div>
  );
}
