import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './entities/Anime/animeSlice';
import  userReducer  from './entities/User/userSlice';
import { genresReducer } from './UI/Genres/genresReducer';
import { sortReducer } from './UI/Sort/sortReducer';
import { searchPopupReducer } from './UI/SearchPopup/searchPopupReducer';
import { notificationReducer } from './UI/Notification/notificationReducer';
import { commentReducer } from './entities/Comment/commentReducer';
import { commentOwnerReducer } from './entities/CommentOwner/commentOwnerReducer';
import { commentFormFocusReducer } from './UI/commentFormFocus/commentFormReducer';

export const store = configureStore({
  reducer: {
    animes: animeReducer,
    genres: genresReducer,
    sort: sortReducer,
    searchPopupOpened: searchPopupReducer,
    user: userReducer,
    notification: notificationReducer,
    comment: commentReducer,
    commentOwner: commentOwnerReducer,
    commentFormFocus: commentFormFocusReducer,
  },
});
