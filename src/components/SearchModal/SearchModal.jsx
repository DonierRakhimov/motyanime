import React from "react";
import s from "./searchmodal.module.css";
import { debounce } from "../../utils/debounce";
import Popup from "../Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { searchPopupClosed } from "../../redux/UI/SearchPopup/searchPopupSlice";
import {
  setSearchResults,
  setSearchStatus,
} from "../../redux/UI/Search/searchSlice";
import {
  selectSearchResults,
  selectSearchStatus,
} from "../../redux/UI/Search/selectors";
import { handleSearch } from "../../redux/UI/Search/thunks/handleSearch";
import { ReactComponent as Xmark } from "../../assets/images/xmark.svg";
import { REQUEST_STATUSES } from "../../utils/requestStatuses";
import isEmpty from "lodash.isempty";
import SearchResults from "../SearchResults/SearchResults";

export default function SearchModal({ isOpen }) {
  const dispatch = useDispatch();
  const searchStatus = useSelector(selectSearchStatus);
  const searchResults = useSelector(selectSearchResults);
  const [searchValue, setSearchValue] = React.useState("");

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
    dispatch(
      setSearchResults(
        searchResults.filter((el) => el._id !== searchedAnime._id)
      )
    );

    const savedSearch = localStorage.getItem("savedSearch");

    if (savedSearch) {
      const parsedSavedSearch = JSON.parse(savedSearch);
      const filteredSavedSearch = parsedSavedSearch.filter(
        (el) => el._id !== searchedAnime._id
      );
      localStorage.setItem("savedSearch", JSON.stringify(filteredSavedSearch));
    }
  };

  React.useEffect(() => {
    const savedSearch = localStorage.getItem("savedSearch");

    if (savedSearch) {
      const parsedSavedSearch = JSON.parse(savedSearch);
      dispatch(setSearchResults(parsedSavedSearch));
    }
  }, [dispatch]);

  return (
    <Popup isOpen={isOpen}>
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
              <Xmark></Xmark>
            </button>
          )}
          <Spiner isActive={searchStatus === REQUEST_STATUSES.pending}></Spiner>
        </div>
        <SearchResults
          searchResults={
            searchStatus === REQUEST_STATUSES.success
              ? searchResults
              : searchStatus === REQUEST_STATUSES.idle &&
                searchResults.slice(0, 4)
          }
          message={
            searchStatus === REQUEST_STATUSES.success
              ? isEmpty(searchResults)
                ? "Ничего не найдено"
                : "Найденные аниме:"
              : searchStatus === REQUEST_STATUSES.idle &&
                !isEmpty(searchResults) &&
                "Недавние запросы:"
          }
          onAnimeClick={(searchedAnime) => handleResultClick(searchedAnime)}
          onAnimeDelete={(searchedAnime) => handleDeleteClick(searchedAnime)}
        ></SearchResults>
      </div>
    </Popup>
  );
}
