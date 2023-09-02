import React from 'react';
import s from './filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadGenres } from '../../redux/UI/Genres/thunks/loadGenres';
import {
  selectAllGenres,
  selectCurrentGenres,
} from '../../redux/UI/Genres/selectors';
import DropDown from '../Dropdown/Dropdown';
import classNames from 'classnames';
import {
  currentGenresReplaced,
  genreAdded,
  genreRemoved,
} from '../../redux/UI/Genres/actionCreators'; 
import { titlesReseted } from '../../redux/entities/Title/actionCreators';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { usePopup } from '../../hooks/usePopup';

export default function Filters() {
  const [filterIsOpen, setFilterIsOpen] = usePopup('#filter')
  const allGenres = useSelector(selectAllGenres);
  const currentGenres = useSelector(selectCurrentGenres);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const controller = new AbortController();
    dispatch(loadGenres(controller.signal));
    return () => controller.abort();
  }, [dispatch]);

  React.useEffect(() => {
    const initialGenres = searchParams.get('genres');
    if (initialGenres) {
      dispatch(currentGenresReplaced(initialGenres.split(',')));
    }
  }, [searchParams, dispatch]);

  const genreClickHandler = (genre) => {
    window.scrollTo(0, 0);
    dispatch(titlesReseted());
    if (currentGenres.includes(genre)) {
      dispatch(genreRemoved(genre));
    } else {
      dispatch(genreAdded(genre));
    }
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className={s.root} id='filter'>
      <button
        onClick={() => {
          setFilterIsOpen(prev => !prev)
        }}
        className={s.filterToggle}
      >
        Жанры
      </button>
        <DropDown isOpen={filterIsOpen}>
          {
            <ul className={s.genresGrid}>
              {allGenres.map((genre, index) => (
                <li className={s.genre} key={index}>
                  <button
                    className={classNames(
                      s.genreButton,
                      currentGenres.includes(genre) ? s.active : ''
                    )}
                    onClick={() => genreClickHandler(genre)}
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          }
        </DropDown>
    </div>
  );
}
