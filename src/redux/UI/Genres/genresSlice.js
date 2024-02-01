import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allGenres: [
    "Боевые искусства",
    "Вампиры",
    "Гарем",
    "Демоны",
    "Детектив",
    "Дзёсей",
    "Драма",
    "Игры",
    "Иссекай",
    "Исторический",
    "Киберпанк",
    "Комедия",
    "Магия",
    "Меха",
    "Мистика",
    "Музыка",
    "Повседневность",
    "Приключения",
    "Психологическое",
    "Романтика",
    "Сверхъестественное",
    "Сёдзе",
    "Сёдзе-ай",
    "Сейнен",
    "Сёнен",
    "Спорт",
    "Супер сила",
    "Триллер",
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
