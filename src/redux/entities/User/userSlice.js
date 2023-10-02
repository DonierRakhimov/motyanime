import { createSlice } from '@reduxjs/toolkit';
import { checkAuth } from './thunks/checkAuth';
import { deleteAnime } from './thunks/deleteAnime';
import { logoutUser } from './thunks/logoutUser';
import { registerUser } from './thunks/registerUser';
import { saveAnime } from './thunks/saveAnime';
import { signInUser } from './thunks/signInUser';
import { updateUser } from './thunks/updateUser';

const initialState = {
  userData: {},
  savedAnimes: [],
  isAuthorized: false,
  checkingAuth: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state, action) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.savedAnimes = action.payload.savedAnimes;
        state.isAuthorized = true;
        state.checkingAuth = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.checkingAuth = false;
      })
      .addCase(deleteAnime.fulfilled, (state, action) => {
        state.savedAnimes = state.savedAnimes.filter(
          (savedAnime) => savedAnime._id !== action.payload
        );
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userData = {};
        state.isAuthorized = false;
        state.savedAnimes = [];
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.savedAnimes = action.payload.savedAnimes;
        state.isAuthorized = true;
      })
      .addCase(saveAnime.fulfilled, (state, action) => {
        state.savedAnimes = [
          ...state.savedAnimes.filter(
            (savedAnime) => savedAnime.animeId !== action.payload.animeId
          ),
          action.payload,
        ];
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.savedAnimes = action.payload.savedAnimes;
        state.isAuthorized = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
  },
});

export default userSlice.reducer;

// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ACTION_TYPES.userLoaded: {
//       return {
//         ...state,
//         userData: action.payload.userData,
//         savedAnimes: action.payload.savedAnimes,
//         isAuthorized: true,
//       };
//     }
//     case ACTION_TYPES.userLoggedOut: {
//       return {
//         ...state,
//         userData: {},
//         isAuthorized: false,
//         savedAnimes: [],
//       };
//     }
//     case ACTION_TYPES.userUpdated: {
//       return {
//         ...state,
//         userData: action.payload,
//       };
//     }
//     case ACTION_TYPES.animeSaved: {
//       return {
//         ...state,
//         savedAnimes: [
//           ...state.savedAnimes.filter(
//             (savedAnime) => savedAnime.animeId !== action.payload.animeId
//           ),
//           action.payload,
//         ],
//       };
//     }
//     case ACTION_TYPES.animeDeleted: {
//       return {
//         ...state,
//         savedAnimes: state.savedAnimes.filter(
//           (savedAnime) => savedAnime._id !== action.payload
//         ),
//       };
//     }
//     case ACTION_TYPES.checkingAuth: {
//       return {
//         ...state,
//         checkingAuth: true,
//       };
//     }
//     case ACTION_TYPES.checkingAuthFinished: {
//       return {
//         ...state,
//         checkingAuth: false,
//       };
//     }
//     default:
//       return state;
//   }
// };
