import { ACTION_TYPES } from './actionCreators'

const initialState = {
  allGenres: [],
  currentGenres: [],
}

export const genresReducer = (state = initialState, action) => {
  switch(action.type) {
    case (ACTION_TYPES.genresLoaded): {
      return {
        ...state,
        allGenres: action.payload
      }
    }
    case (ACTION_TYPES.genreAdded): {
      return {
        ...state,
        currentGenres: [...state.currentGenres, action.payload]
      }
    }
    case (ACTION_TYPES.genreRemoved): {
      return {
        ...state,
        currentGenres: state.currentGenres.filter(genre => genre !== action.payload)
      }
    }
    case (ACTION_TYPES.currentGenresReplaced): {
      return {
        ...state,
        currentGenres: action.payload,
      }
    } 
    default: 
      return state;
  }
}