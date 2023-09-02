import { requestStatuses } from '../../../utils/requestStatuses';
import { ACTION_TYPES } from './actionCreators';

const initialState = {
  status: 'idle',
  entities: [],
  fullyLoadedTitle: {},
  currentPage: 1,
  totalPages: 0,
}

export const titleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.titlesLoading: {
      return {
        ...state,
        status: requestStatuses.loading,
      }
    }
    case ACTION_TYPES.titlesLoaded: {
      return {
        status: requestStatuses.idle,
        entities: action.payload.titles,
        currentPage: ++state.currentPage,
        totalPages: action.payload.pages,
      }
    }
    case ACTION_TYPES.titlesAdded: {
      return {
        ...state,
        entities: [...state.entities, ...action.payload],
        currentPage: ++state.currentPage,
      }
    }
    case ACTION_TYPES.titlesReseted: {
      return {
        ...state,
        entities: [],
        currentPage: 1
      }
    }
    default: 
      return state;
  }
}