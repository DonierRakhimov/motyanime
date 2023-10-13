import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './entities/Anime/animeSlice';
import commentOwnersReducer from './entities/CommentOwner/commentOwnersSlice';
import commentsReducer from './entities/Comment/commentsSlice';
import userReducer from './entities/User/userSlice';
import genresReducer from './UI/Genres/genresSlice';
import  sortReducer  from './UI/Sort/sortSlice';
import searchPopupReducer from './UI/SearchPopup/searchPopupSlice';
import notificationReducer from './UI/Notification/notificationSlice';
import commentFormIsFocusedReducer from './UI/commentFormIsFocused/commentFormIsFocusedSlice';
import currentAnimeReducer from './entities/CurrentAnime/currentAnimeSlice';
import searchReducer from './UI/Search/searchSlice';

export const store = configureStore({
  reducer: {
    animes: animeReducer,
    genres: genresReducer,
    sort: sortReducer,
    searchPopupOpened: searchPopupReducer,
    user: userReducer,
    notification: notificationReducer,
    comments: commentsReducer,
    commentOwners: commentOwnersReducer,
    commentFormIsFocused: commentFormIsFocusedReducer,
    currentAnime: currentAnimeReducer,
    search: searchReducer,
  },
});
