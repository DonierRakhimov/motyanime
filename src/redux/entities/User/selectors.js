export const selectUserSlice = (state) => state.user;

export const selectUserData = (state) => selectUserSlice(state).userData;

export const selectIsAuthorized = (state) => selectUserSlice(state).isAuthorized;