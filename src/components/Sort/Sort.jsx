import React from 'react';
import s from './sort.module.css';
import DropDown from '../Dropdown/Dropdown';
import { selectCurrentSort } from '../../redux/UI/Sort/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { sortSelected } from '../../redux/UI/Sort/actionCreators';
import { usePopup } from '../../hooks/usePopup';
import { titlesReseted } from '../../redux/entities/Title/actionCreators';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const sortVariants = {
  'names.ru': 'По названию',
  'season.year': 'По дате выхода',
  in_favorites: 'По популярности',
};

export default function Sort() {
  const [sortIsOpen, setSortIsOpen] = usePopup('#sort');
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const currentSort = useSelector(selectCurrentSort);
  const location = useLocation();
  const navigate = useNavigate();

  const sortChangeHandler = (sortParam) => {
    window.scrollTo(0, 0);
    dispatch(titlesReseted());
    dispatch(sortSelected(sortParam));
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  React.useEffect(() => {
    const sortQueryParam = searchParams.get('sort');
    if (sortQueryParam) {
      dispatch(sortSelected(sortQueryParam));
    }
  }, [searchParams, dispatch]);

  return (
    <div className={s.root} id='sort'>
      <button
        className={s.sortToggle}
        onClick={() => {
          setSortIsOpen((prev) => !prev);
        }}
      >
        Сортировка
      </button>
      <DropDown isOpen={sortIsOpen}>
        {Object.keys(sortVariants).map((sortParam, index) => (
          <label className={s.label} key={index}>
            <input
              className={s.radioBtn}
              name='sort'
              checked={currentSort === sortParam}
              type='radio'
              onChange={() => sortChangeHandler(sortParam)}
            ></input>
            <span
              className={classNames(
                s.customRadio,
                currentSort === sortParam ? s.checked : ''
              )}
              checked={currentSort === sortParam}
            ></span>
            {sortVariants[sortParam]}
          </label>
        ))}
      </DropDown>
    </div>
  );
}
