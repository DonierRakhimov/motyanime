import { ACTION_TYPES } from './actionCreators';

const initialState = false;

export const searchPopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.searchPopupClosed: {
      return false;
    }
    case ACTION_TYPES.searchPopupOpened: {
      return true;
    }
    default: 
      return state;
  }
}