import { ACTION_TYPES } from './actionCreators';

const initialState = {
  userData: {},
  savedAnimes: [],
  isAuthorized: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.userLoaded: {
      return {
        userData: action.payload.userData,
        savedAnimes: action.payload.savedAnimes,
        isAuthorized: true,
      };
    }
    case ACTION_TYPES.userLoggedOut: {
      return {
        userData: {},
        isAuthorized: false,
        savedAnimes: [],
      };
    }
    case ACTION_TYPES.userUpdated: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case ACTION_TYPES.animeSaved: {
      return {
        ...state,
        savedAnimes: [
          ...state.savedAnimes.filter(
            (savedAnime) => savedAnime.animeId !== action.payload.animeId
          ),
          action.payload,
        ],
      };
    }
    case ACTION_TYPES.animeDeleted: {
      return {
        ...state,
        savedAnimes: state.savedAnimes.filter(savedAnime => savedAnime._id !== action.payload)
      }
    }
    default:
      return state;
  }
};
