import { ACTION_TYPES } from './actionCreators';

const initalState = {
  isShown: false,
  color: 'red',
  message: 'message',
}

export const notificationReducer = (state = initalState, action) => {
  switch (action.type) {
    case (ACTION_TYPES.toggled): {
      return {
        isShown: !state.isShown,
        color: action.payload.color,
        message: action.payload.message,
      }
    }
    default: {
      return state;
    }
  }
}