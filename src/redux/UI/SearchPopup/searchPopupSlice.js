import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const searchPopupSlice = createSlice({
  name: 'searchPopup',
  initialState,
  reducers: {
    searchPopupClosed() {
      return false;
    },
    searchPopupOpened() {
      return true;
    },
  },
});

export const { searchPopupClosed, searchPopupOpened } =
  searchPopupSlice.actions;

export default searchPopupSlice.reducer;
