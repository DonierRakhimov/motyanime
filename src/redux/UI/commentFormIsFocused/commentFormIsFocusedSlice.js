import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const commentFormIsFocusedSlice = createSlice({
  name: "commentFormIsFocused",
  initialState,
  reducers: {
    focusGained() {
      return true;
    },
    focusLost() {
      return false;
    },
  },
});

export const { focusGained, focusLost } = commentFormIsFocusedSlice.actions;

export default commentFormIsFocusedSlice.reducer;
