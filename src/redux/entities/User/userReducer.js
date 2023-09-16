import { ACTION_TYPES } from './actionCreators'

const initialState = {
  userData: {},
  isAuthorized: false, 
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.userLoaded: {
      return {
        userData: action.payload,
        isAuthorized: true
      }
    }
    case ACTION_TYPES.userLoggedOut: {
      return {
        userData: {},
        isAuthorized: false,
      }
    }
    case ACTION_TYPES.userUpdated: {
      return {
        ...state,
        userData: action.payload,
      }
    }
    default: 
      return state;
  }
}