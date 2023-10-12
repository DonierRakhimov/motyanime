import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSort: 'names.ru',
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    sortSelected(state, action) {
      state.currentSort = action.payload;
    }
  }
})

export const {sortSelected} = sortSlice.actions;

export default sortSlice.reducer;
