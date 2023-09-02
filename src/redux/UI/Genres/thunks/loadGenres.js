import { axiosInstance } from '../../../../utils/axiosOptions';
import { genresLoaded } from '../actionCreators';
import { selectGenresAreLoaded } from '../selectors';

export const loadGenres = (signal) => (dispatch, getState) => {
  if (selectGenresAreLoaded(getState())) {
    return;
  }
  return axiosInstance
    .get('/genres', { signal })
    .then((response) => {
      const { data: genres } = response;
      dispatch(genresLoaded(genres));
    })
    .catch((err) => {
      console.log(err);
    });
};
