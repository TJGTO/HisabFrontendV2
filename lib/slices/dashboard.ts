import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.open = true;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = dashboardSlice.actions;

export default dashboardSlice.reducer;
