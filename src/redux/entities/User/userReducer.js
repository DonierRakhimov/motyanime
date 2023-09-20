import { ACTION_TYPES } from './actionCreators';

const initialState = {
  userData: {},
  savedAnimes: [],
  isAuthorized: false,
  checkingAuth: true,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.userLoaded: {
      return {
        ...state,
        userData: action.payload.userData,
        savedAnimes: action.payload.savedAnimes,
        isAuthorized: true,
      };
    }
    case ACTION_TYPES.userLoggedOut: {
      return {
        ...state,
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
    case ACTION_TYPES.checkingAuth: {
      return {
        ...state,
        checkingAuth: true,
      }
    }
    case ACTION_TYPES.checkingAuthFinished: {
      return {
        ...state,
        checkingAuth: false,
      }
    }
    default:
      return state;
  }
};
