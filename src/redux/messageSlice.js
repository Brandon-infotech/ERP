import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchMessages: (state, action) => {
      state.messages = action.payload.message;
    },
  },
});

export const { fetchMessages } = messageSlice.actions;

export default messageSlice.reducer;
