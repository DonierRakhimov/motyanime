import { ACTION_TYPES } from './actionCreators.js'

const initialState = {
  currentSort: '',
}

export const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.sortSelected: {
      return {
        ...state,
        currentSort: action.payload,
      }
    }
    default: 
      return state;
  }
}