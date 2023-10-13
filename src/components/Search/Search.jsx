import React from "react";
import s from "./search.module.css";
import Popup from "../Popup/Popup";
import popupStyles from "../Popup/popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Spiner from "../Spiner/Spiner";
import debounce from "lodash.debounce";
import AnimeResult from "../AnimeResult/AnimeResult";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchPopupIsOpen } from "../../redux/UI/SearchPopup/selectors";
import {
  searchPopupClosed,
  searchPopupOpened,
} from "../../redux/UI/SearchPopup/searchPopupSlice";
import {
  selectSearchResults,
  selectSearchStatus,
} from "../../redux/UI/Search/selectors";
import {
  setSearchResults,
  setSearchStatus,
} from "../../redux/UI/Search/searchSlice";
import { REQUEST_STATUSES } from "../../utils/requestStatuses";
import { handleSearch } from "../../redux/UI/Search/thunks/handleSearch";
import isEmpty from "lodash.isempty";

export default function Search() {
  const searchIsOpen = useSelector(selectSearchPopupIsOpen);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState("");
  const searchResults = useSelector(selectSearchResults);
  const searchStatus = useSelector(selectSearchStatus);

  const searchAnimes = React.useCallback(
    debounce((searchValue) => {
      dispatch(handleSearch(searchValue));
    }, 3000),
    []
  );

  const handleSearchChange = (e) => {
    const { target } = e;
    dispatch(setSearchStatus(REQUEST_STATUSES.pending));
    setSearchValue(target.value);
    searchAnimes(target.value);
  };

  const handleResultClick = (searchedAnime) => {
    const stringifiedSearchedAnime = JSON.stringify(searchedAnime);
    const savedSearch = localStorage.getItem("savedSearch");

    if (savedSearch) {
      const parsedSavedSearch = JSON.parse(savedSearch);
      if (!parsedSavedSearch.find((el) => el._id === searchedAnime._id)) {
        parsedSavedSearch.push(searchedAnime);
        localStorage.setItem("savedSearch", JSON.stringify(parsedSavedSearch));
      }
    } else {
      localStorage.setItem("savedSearch", `[${stringifiedSearchedAnime}]`);
    }

    dispatch(searchPopupClosed());
  };

  const handleDeleteClick = (searchedAnime) => {
    dispatch(setSearchResults(searchResults.filter((el) => el._id !== searchedAnime._id)));

    const savedSearch = localStorage.getItem("savedSearch");

    if (savedSearch) {
      const parsedSavedSearch = JSON.parse(savedSearch);
      const filteredSavedSearch = parsedSavedSearch.filter(el => el._id !== searchedAnime._id);
      localStorage.setItem("savedSearch", JSON.stringify(filteredSavedSearch));
    } 
  }

  React.useEffect(() => {
    const savedSearch = localStorage.getItem("savedSearch");

    if (savedSearch) {
      const parsedSavedSearch = JSON.parse(savedSearch);
      dispatch(setSearchResults(parsedSavedSearch));
    }
  }, [dispatch]);

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
      <div className={s.searchContainer}>
        <span className={s.searchIcon}></span>
        <button
          onClick={() => dispatch(searchPopupOpened())}
          type="button"
          className={s.search}
        >
          Search
        </button>
      </div>
      {searchIsOpen && (
        <Popup isOpen={searchIsOpen}>
          <div className={s.searchModal}>
            <div className={s.searchContainer}>
              <span className={s.searchIcon}></span>
              <input
                value={searchValue}
                onChange={handleSearchChange}
                className={s.search}
                placeholder="Название..."
              />
              {Boolean(searchValue.length) && (
                <button
                  onClick={() => {
                    setSearchValue("");
                    dispatch(setSearchResults([]));
                    dispatch(setSearchStatus(REQUEST_STATUSES.idle));
                  }}
                  className={s.clearBtn}
                  type="button"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
              <Spiner
                isActive={searchStatus === REQUEST_STATUSES.pending}
              ></Spiner>
            </div>
            {searchStatus === REQUEST_STATUSES.success &&
              (isEmpty(searchResults) ? (
                <p className={s.message}>Ничего не найдено</p>
              ) : (
                <ul className={s.searchList}>
                  {searchResults.map((searchedAnime) => (
                    <li key={searchedAnime._id}>
                      <AnimeResult
                        animeResult={searchedAnime}
                        onClick={() => handleResultClick(searchedAnime)}
                        onDelete={() => handleDeleteClick(searchedAnime)}
                      ></AnimeResult>
                    </li>
                  ))}
                </ul>
              ))}
            {searchStatus === REQUEST_STATUSES.idle &&
              !isEmpty(searchResults) && (
                <>
                  <p className={s.message}>Недавние запросы:</p>
                  <ul className={s.searchList}>
                    {searchResults.slice(0, 4).map((searchedAnime) => (
                      <li key={searchedAnime._id}>
                        <AnimeResult
                          animeResult={searchedAnime}
                          onClick={() => handleResultClick(searchedAnime)}
                          onDelete={() => handleDeleteClick(searchedAnime)}
                        ></AnimeResult>
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </div>
        </Popup>
      )}
    </>
  );
}
