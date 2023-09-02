import React from 'react';
import DropDown from '../Dropdown/Dropdown';
import {
  CustomRadio,
  Label,
  RadioButton,
  SortToggle,
  SortWrapper,
} from './styledComponents';
import { selectCurrentSort } from '../../redux/UI/Sort/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { sortSelected } from '../../redux/UI/Sort/actionCreators';
import { usePopup } from '../../hooks/usePopup';
import { titlesReseted } from '../../redux/entities/Title/actionCreators';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
  }

  React.useEffect(() => {
    const sortQueryParam = searchParams.get('sort');
    if (sortQueryParam) {
      dispatch(sortSelected(sortQueryParam));
    }
  }, [searchParams, dispatch])

  return (
    <SortWrapper id="sort">
      <SortToggle onClick={() => {
          setSortIsOpen((prev) => !prev)
        }}>
        Сортировка
      </SortToggle>
      <DropDown isOpen={sortIsOpen}>
        {Object.keys(sortVariants).map((sortParam, index) => (
          <Label key={index}>
            <RadioButton
              name='sort'
              checked={currentSort === sortParam}
              type='radio'
              onChange={() => sortChangeHandler(sortParam)}
            ></RadioButton>
            <CustomRadio checked={currentSort === sortParam}></CustomRadio>
            {sortVariants[sortParam]}
          </Label>
        ))}
      </DropDown>
    </SortWrapper>
  );
}
