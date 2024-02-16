import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allGenres: [
    "Боевые искусства",
    "Вампиры",
    "Детектив",
    "Драма",
    "Игры",
    "Киберпанк",
    "Комедия",
    "Магия",
    "Меха",
    "Мистика",
    "Повседневность",
    "Приключения",
    "Психологическое",
    "Романтика",
    "Сверхъестественное",
    "Сейнен",
    "Сёнен",
    "Супер сила",
    "Ужасы",
    "Фантастика",
    "Фэнтези",
    "Школа",
    "Экшен",
    "Этти",
  ],
  currentGenres: [],
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    genreAdded(state, action) {
      state.currentGenres.push(action.payload);
    },
    genreRemoved(state, action) {
      state.currentGenres = state.currentGenres.filter(
        (genre) => genre !== action.payload
      );
    },
    currentGenresReplaced(state, action) {
      state.currentGenres = action.payload;
    },
  },
});

export const { genreAdded, genreRemoved, currentGenresReplaced } =
  genresSlice.actions;

export default genresSlice.reducer;
