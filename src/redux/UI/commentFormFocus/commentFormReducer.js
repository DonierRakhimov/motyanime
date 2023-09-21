import { ACTION_TYPES } from './actionCreators';

const initialState = false;

export const commentFormFocusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.focusGained: {
      return true;
    }
    case ACTION_TYPES.focusLost: {
      return false;
    }
    default:
      return state;
  }
};
