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
import Spiner from "../Spiner/Spiner";
import SearchInput from "../SearchInput/SearchInput";

export default function SearchModal({ isOpen = false }) {
  const dispatch = useDispatch();
  const searchStatus = useSelector(selectSearchStatus);
  const searchResults = useSelector(selectSearchResults);
  const [searchValue, setSearchValue] = React.useState("");
  const searchRef = React.useRef(null);
  const makeRequestRef = React.useRef(true);

  const searchAnimes = React.useCallback(
    debounce((searchValue) => {
      dispatch(
        handleSearch({ searchValue, makeRequest: makeRequestRef.current })
      );
    }, 3000),
    []
  );

  const handleSearchChange = (e) => {
    const { target } = e;
    setSearchValue(target.value);
    if (target.value) {
      makeRequestRef.current = true;
      dispatch(setSearchStatus(REQUEST_STATUSES.pending));
      searchAnimes(target.value);
    } else {
      makeRequestRef.current = false;
      dispatch(setSearchStatus(REQUEST_STATUSES.idle));
    }
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

  React.useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  let resultsToRender = [];
  let messageToRender = "";

  if (searchStatus === REQUEST_STATUSES.success) {
    resultsToRender = searchResults;
    if (!isEmpty(searchResults)) {
      messageToRender = "Найденные аниме:";
    } else {
      messageToRender = "Ничего не найдено";
    }
  } else if (searchStatus === REQUEST_STATUSES.idle) {
    resultsToRender = searchResults.slice(0, 4);

    if (!isEmpty(searchResults)) {
      messageToRender = "Недавние запросы:";
    }
  }

  return (
    isOpen && (
      <Popup isOpen={isOpen}>
        <div className={s.searchModal}>
          <SearchInput
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Название..."
            ref={searchRef}
          >
            {Boolean(searchValue.length) && (
              <button
                onClick={() => {
                  setSearchValue("");
                  dispatch(setSearchResults([]));
                  dispatch(setSearchStatus(REQUEST_STATUSES.idle));
                  makeRequestRef.current = false;
                }}
                className={s.clearBtn}
                type="button"
              >
                <Xmark></Xmark>
              </button>
            )}
            <Spiner
              isActive={searchStatus === REQUEST_STATUSES.pending}
            ></Spiner>
          </SearchInput>
          <SearchResults
            searchResults={resultsToRender}
            message={messageToRender}
            onAnimeClick={(searchedAnime) => handleResultClick(searchedAnime)}
            onAnimeDelete={(searchedAnime) => handleDeleteClick(searchedAnime)}
          ></SearchResults>
        </div>
      </Popup>
    )
  );
}
