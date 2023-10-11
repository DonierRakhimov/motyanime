import React from 'react';
import s from './search.module.css';
import Popup from '../Popup/Popup';
import popupStyles from '../Popup/popup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Spiner from '../Spiner/Spiner';
import debounce from 'lodash.debounce';
import { axiosInstance } from '../../utils/axiosOptions';
import AnimeResult from '../AnimeResult/AnimeResult';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchPopupIsOpen } from '../../redux/UI/SearchPopup/selectors';
import { searchPopupClosed, searchPopupOpened } from '../../redux/UI/SearchPopup/searchPopupSlice';

export default function Search() {
  const searchIsOpen = useSelector(selectSearchPopupIsOpen);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');
  const [searchStatus, setSearchStatus] = React.useState('idle');
  const [searchResult, setSearchResult] = React.useState([]);

  const searchAnimes = React.useCallback(
    debounce((e) => {
      axiosInstance
        .get('/title/search', {
          params: {
            search: e.target.value,
            filter: 'id,names.ru,genres[0],status.string,type.string',
            limit: 5,
          },
        })
        .then((result) => {
          const { data } = result;
          setSearchResult(data.list);
          setSearchStatus('success');
        })
        .catch((err) => {
          console.log(err);
          setSearchStatus('failed');
        });
    }, 1000),
    []
  );

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    searchAnimes(e);
    setSearchStatus('pending');
  };

  const handleResultClick = (searchedTitle) => {
    const stringifiedSearchedTitle = JSON.stringify(searchedTitle);
    const savedSearch = localStorage.getItem('savedSearch');

    if (savedSearch) {
      const parsedSavedSearch = JSON.parse(savedSearch);
      if (!parsedSavedSearch.find((el) => el.id === searchedTitle.id)) {
        parsedSavedSearch.push(searchedTitle);
        localStorage.setItem('savedSearch', JSON.stringify(parsedSavedSearch));
      }
    } else {
      localStorage.setItem('savedSearch', `[${stringifiedSearchedTitle}]`);
    }

    dispatch(searchPopupClosed());
  };

  React.useEffect(() => {
    const savedSearch = localStorage.getItem('savedSearch');

    if (savedSearch) {
      const parsedSavedSearch = JSON.parse(savedSearch);
      setSearchResult(parsedSavedSearch);
    }
  }, []);

  React.useEffect(() => {
    function closeEscHandler(evt) {
      if (evt.key === 'Escape') {
        dispatch(searchPopupClosed());
      }
    }

    function closeClickHandler(evt) {
      if (!evt.target.closest(`.${popupStyles.modal}`)) {
        dispatch(searchPopupClosed())
      }
    }

    if (searchIsOpen) {
      window.addEventListener('keydown', closeEscHandler);
      window.addEventListener('click', closeClickHandler, { capture: true });
    }

    return () => {
      window.removeEventListener('keydown', closeEscHandler);
      window.removeEventListener('click', closeClickHandler, { capture: true });
    };
  }, [searchIsOpen, dispatch]);

  return (
    <>
      <div className={s.searchContainer}>
        <span className={s.searchIcon}></span>
        <button
          onClick={() => dispatch(searchPopupOpened())}
          type='button'
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
                onChange={handleSearch}
                className={s.search}
                placeholder='Название...'
              />
              {Boolean(searchValue.length) && (
                <button
                  onClick={() => {
                    setSearchValue('');
                    setSearchStatus('idle');
                    setSearchResult([]);
                  }}
                  className={s.clearBtn}
                  type='button'
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
              <Spiner isActive={searchStatus === 'pending'}></Spiner>
            </div>
            {searchStatus === 'success' &&
              (!searchResult.length ? (
                <p className={s.message}>Ничего не найдено</p>
              ) : (
                <ul className={s.searchList}>
                  {searchResult.map((searchedTitle) => (
                    <li key={searchedTitle._id}>
                      <AnimeResult
                        animeResult={searchedTitle}
                        onClick={() => handleResultClick(searchedTitle)}
                      ></AnimeResult>
                    </li>
                  ))}
                </ul>
              ))}
            {searchStatus === 'idle' && Boolean(searchResult.length) && (
              <>
                <p className={s.message}>Недавние запросы:</p>
                <ul className={s.searchList}>
                  {searchResult.slice(0, 4).map((searchTitle) => (
                    <li key={searchTitle._id}>
                      <AnimeResult
                        animeResult={searchTitle}
                        onClick={() =>
                          handleResultClick(searchTitle)
                        }
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
