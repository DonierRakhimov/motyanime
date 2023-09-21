import { REQUEST_STATUSES } from '../../../utils/requestStatuses';
import { ACTION_TYPES } from './actionCreators';

const initialState = {
  entities: {},
  allIds: [],
  status: REQUEST_STATUSES.idle,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.commentsLoaded: {
      const { payload: comments } = action;
      const entities = comments.reduce((acc, comment) => {
        comment.owner = comment.owner._id;
        acc[comment._id] = comment;
        return acc;
      }, {});
      const allIds = comments.map((comment) => comment._id);
      return {
        entities,
        allIds,
        status: REQUEST_STATUSES.success,
      };
    }
    case ACTION_TYPES.commentAdded: {
      const { payload: comment } = action;
      return {
        ...state,
        entities: {
          ...state.entities,
          [comment._id]: { ...comment, owner: comment.owner._id },
        },
        allIds: [...state.allIds, comment._id],
      };
    }
    case ACTION_TYPES.commentsLoading: {
      return {
        ...state,
        status: REQUEST_STATUSES.pending
      }
    }
    case ACTION_TYPES.commentsFailedToLoad: {
      return {
        ...state,
        status: REQUEST_STATUSES.failed
      }
    }
    default:
      return state;
  }
};
