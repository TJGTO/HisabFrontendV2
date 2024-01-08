import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gameModelStateObj } from "../../app/gamedetails/domain";
import { createGameReqBody } from "../../app/gamedetails/domain";
import { createaGame, getActiveMatches } from "../../app/gamedetails/service";

const initialState: gameModelStateObj = {
  gameLoader: false,
  errorOnCreation: false,
  gameCreationMessage: "",
  activeGames: [],
};

export const createTheGame = createAsyncThunk(
  "gameModel/updateUser",
  async (data: createGameReqBody, { getState, dispatch }) => {
    try {
      const response = await createaGame(data);
      dispatch(fetchActiveGames());
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchActiveGames = createAsyncThunk(
  "gameModel/fetchActiveGames",
  async () => {
    try {
      const response = await getActiveMatches();
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
        state.gameCreationMessage = action.payload.message;
      } else if (action.payload) {
        state.errorOnCreation = true;
        state.gameCreationMessage = action.payload.message;
      }
    });
    builder.addCase(createTheGame.rejected, (state, action) => {
      state.gameLoader = false;
    });
    builder.addCase(fetchActiveGames.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.activeGames = action.payload.matches;
      }
    });
  },
});

export default gameModelSlice.reducer;
