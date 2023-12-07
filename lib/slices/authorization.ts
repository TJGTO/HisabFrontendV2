import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../../app/registration/service";
import { registrationObj } from "../../app/registration/domain";

const initialState = {
  count: 1,
  registrationLoader: false,
  registrationSuccess: false,
  registrationMessage: "",
};

export const registerTheUser = createAsyncThunk(
  "authorization/registration",
  async (data: registrationObj) => {
    try {
      const response = await registerUser(data);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerTheUser.pending, (state) => {
      state.registrationLoader = true;
    });
    builder.addCase(registerTheUser.fulfilled, (state, action) => {
      console.log("actopn", action);
      if (action.payload && action.payload.success) {
        state.registrationSuccess = true;
        state.registrationMessage = action.payload.message;
      } else if (action.payload) {
        state.registrationSuccess = false;
        state.registrationMessage = action.payload.message;
      }

      state.registrationLoader = false;
    });
  },
});

export const { increment } = authorizationSlice.actions;

export default authorizationSlice.reducer;
