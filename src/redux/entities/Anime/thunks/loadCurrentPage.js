import { selectCurrentPage } from "../selectors";
import { selectCurrentGenres } from "../../../UI/Genres/selectors";
import { selectCurrentSort } from "../../../UI/Sort/selectors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import isEmpty from "lodash.isempty";
import axios from "axios";
import { userBase } from "../../../../utils/baseUrls";

export const loadCurrentPage = createAsyncThunk(
  "animes/loadCurrentPage",
  async (signal, { getState }) => {
    try {
      const currentPage = selectCurrentPage(getState());
      const currentGenres = selectCurrentGenres(getState());
      const currentSort = selectCurrentSort(getState());

      const params = {
        page: currentPage,
        limit: 8
      };

      if (!isEmpty(currentGenres)) {
        params.genres = currentGenres.join();
      }

      if (currentSort) {
        params.sort = currentSort;
      } 

      const response = await axios.get('/animes', {
        baseURL: userBase,
        params,
        signal,
      })
      const { data } = response;

      return data;
    } catch (err) {
      throw err;
    }
  }
);

// export const loadCurrentPage = createAsyncThunk(
//   'animes/loadCurrentPage',
//   async (signal, { getState }) => {
//     const currentPage = selectCurrentPage(getState());
//     const currentGenres = selectCurrentGenres(getState());
//     const currentSort = selectCurrentSort(getState());

//     const params = {
//       year: '2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023',
//       remove:
//         'code,updated,last_change,team,torrents,blocked,player,announce,franchises',
//       sort_direction: 1,
//     };

//     if (currentGenres.length) params.genres = currentGenres.join(',');
//     if (currentSort) {
//       params.order_by = currentSort;
//       params.items_per_page = currentPage * 8;
//     } else {
//       params.items_per_page = 8;
//       if (currentPage !== 1) {
//         params.page = currentPage;
//       }
//     }
//     if (currentSort === 'names.ru') params.sort_direction = 0;

//     try {
//       const response = await axiosInstance.get('/title/search', {
//         params,
//         signal,
//       });
//       const { data } = response;
//       if (currentPage === 1) {
//         return {
//           animes: data.list,
//           pages: data.pagination.pages,
//         };
//       } else {
//         return data.list;
//       }
//     } catch (err) {
//       throw err;
//     }
//   }
// );
