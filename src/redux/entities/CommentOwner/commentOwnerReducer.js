import { ACTION_TYPES } from './actionCreators';

const initialState = {
  entities: {},
  allIds: [],
};

export const commentOwnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.commentOwnersLoaded: {
      const { payload: owners } = action;
      const entities = owners.reduce((acc, owner) => {
        acc[owner._id] = owner;
        return acc;
      }, {});
      const allIds = owners.map((owner) => owner._id);
      return {
        entities,
        allIds,
      };
    }
    case ACTION_TYPES.commentOwnerAdded: {
      const { payload: owner } = action;
      return {
        entities: {
          ...state.entities,
          [owner._id]: owner,
        },
        allIds: [...state.allIds, owner._id],
      };
    }
    default:
      return state;
  }
};
