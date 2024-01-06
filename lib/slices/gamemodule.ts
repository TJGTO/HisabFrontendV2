import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gameModelStateObj } from "../../app/gamedetails/domain";
import { createGameReqBody } from "../../app/gamedetails/domain";
import { createaGame } from "../../app/gamedetails/service";

const initialState: gameModelStateObj = {
  gameLoader: false,
  errorOnCreation: false,
  gameCreationMessage: "",
};

export const createTheGame = createAsyncThunk(
  "profileSection/updateUser",
  async (data: createGameReqBody, { getState, dispatch }) => {
    try {
      const response = await createaGame(data);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
const gameModelSlice = createSlice({
  name: "gamemodel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTheGame.pending, (state) => {
      state.gameLoader = true;
    });
    builder.addCase(createTheGame.fulfilled, (state, action) => {
      state.gameLoader = false;
      if (action.payload && action.payload.success) {
      } else if (action.payload) {
      }
    });
    builder.addCase(createTheGame.rejected, (state, action) => {
      state.gameLoader = false;
    });
  },
});

export default gameModelSlice.reducer;
