import React from "react";
import popupStyles from "../Popup/popup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchPopupIsOpen } from "../../redux/UI/SearchPopup/selectors";
import {
  searchPopupClosed,
  searchPopupOpened,
} from "../../redux/UI/SearchPopup/searchPopupSlice";
import SearchModal from "../SearchModal/SearchModal";
import SearchInput from "../SearchInput/SearchInput";

export default function Search() {
  const searchIsOpen = useSelector(selectSearchPopupIsOpen);
  const dispatch = useDispatch();

  React.useEffect(() => {
    function closeEscHandler(evt) {
      if (evt.key === "Escape") {
        dispatch(searchPopupClosed());
      }
    }

    function closeClickHandler(evt) {
      if (!evt.target.closest(`.${popupStyles.modal}`)) {
        dispatch(searchPopupClosed());
      }
    }

    if (searchIsOpen) {
      window.addEventListener("keydown", closeEscHandler);
      window.addEventListener("click", closeClickHandler, { capture: true });
    }

    return () => {
      window.removeEventListener("keydown", closeEscHandler);
      window.removeEventListener("click", closeClickHandler, { capture: true });
    };
  }, [searchIsOpen, dispatch]);

  return (
    <>
      <SearchInput
        onClick={() => dispatch(searchPopupOpened())}
        placeholder="Поиск"
      ></SearchInput>
      <SearchModal isOpen={searchIsOpen} />
    </>
  );
}
