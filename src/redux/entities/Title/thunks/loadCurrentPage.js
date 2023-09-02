import { selectCurrentPage } from '../selectors';
import { titlesAdded, titlesLoaded, titlesLoading } from '../actionCreators';
import { selectCurrentGenres } from '../../../UI/Genres/selectors';
import { axiosInstance } from '../../../../utils/axiosOptions';
import { selectCurrentSort } from '../../../UI/Sort/selectors';

export const loadCurrentPage = (signal) => (dispatch, getState) => {
  const currentPage = selectCurrentPage(getState());
  const currentGenres = selectCurrentGenres(getState());
  const currentSort = selectCurrentSort(getState());

  if (currentPage === 1) {
    dispatch(titlesLoading());
  }

  const params = {
    year: '2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023',
    remove:
      'code,updated,last_change,team,torrents,blocked,player,announce,franchises',
    sort_direction: 1,
  };

  if (currentGenres.length) params.genres = currentGenres.join(',');
  if (currentSort) {
    params.order_by = currentSort;
    params.items_per_page = currentPage * 8;
  } else {
    params.items_per_page = 8;
    if (currentPage !== 1) {
      params.page = currentPage;
    }
  }
  if (currentSort === 'names.ru') params.sort_direction = 0;

  return axiosInstance
    .get('/title/search', {
      params,
      signal,
    })
    .then((response) => {
      const { data } = response;
      dispatch(
        currentPage === 1 || currentSort
          ? titlesLoaded({
              titles: data.list,
              pages: data.pagination.pages,
            })
          : titlesAdded(data.list)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
