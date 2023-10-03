import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  color: 'red',
  message: 'message',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationToggled(state, action) {
      state.isShown = !state.isShown;
      state.color = action.payload.color;
      state.message = action.payload.message;
    }
  }
})

export const { notificationToggled } = notificationSlice.actions;

export default notificationSlice.reducer;

