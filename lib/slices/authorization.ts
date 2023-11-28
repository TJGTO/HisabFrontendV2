import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  count: 1,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = authorizationSlice.actions;

export default authorizationSlice.reducer;
