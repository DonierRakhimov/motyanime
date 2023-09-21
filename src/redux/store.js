import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux'
import { titleReducer } from './entities/Title/titleReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { genresReducer } from './UI/Genres/genresReducer';
import { sortReducer } from './UI/Sort/sortReducer';
import { searchPopupReducer } from './UI/SearchPopup/searchPopupReducer';
import { userReducer } from './entities/User/userReducer';
import { notificationReducer } from './UI/Notification/notificationReducer';
import { commentReducer } from './entities/Comment/commentReducer';
import { commentOwnerReducer } from './entities/CommentOwner/commentOwnerReducer';
import { commentFormFocusReducer } from './UI/commentFormFocus/commentFormReducer';

const rootReducer = combineReducers({
  titles: titleReducer,
  genres: genresReducer,
  sort: sortReducer,
  searchPopupOpened: searchPopupReducer,
  user: userReducer,
  notification: notificationReducer,
  comment: commentReducer,
  commentOwner: commentOwnerReducer,
  commentFormFocus: commentFormFocusReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
