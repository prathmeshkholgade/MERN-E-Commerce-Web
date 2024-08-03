import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "Message",
  initialState: {
    message: null,
    success: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    clearMessage: (state, action) => {
      state.message = null;
      state.success = null;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
