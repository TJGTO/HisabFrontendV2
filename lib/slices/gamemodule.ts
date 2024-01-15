import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  gameModelStateObj,
  createGameReqBody,
} from "../../app/gamedetails/domain";

import {
  createaGame,
  getActiveMatches,
  getMatchDetails,
  registerIngame,
} from "../../app/gamedetails/service";

const initialState: gameModelStateObj = {
  gameLoader: false,
  errorOnCreation: false,
  gameDetailsLoader: false,
  gameCreationMessage: "",
  activeGames: [],
  gameDetails: null,
  messageBoxFlag: false,
  messageBoxMessage: "",
  messageboxType: "",
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
export const fetchGameDetails = createAsyncThunk(
  "gameModel/fetchGameDetails",
  async (gameId: string) => {
    try {
      const response = await getMatchDetails(gameId);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const registerSlot = createAsyncThunk(
  "gameModel/registerSlot",
  async (data: FormData) => {
    try {
      const response = await registerIngame(data);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
const gameModelSlice = createSlice({
  name: "gamemodel",
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.errorOnCreation = false;
      state.gameCreationMessage = "";
      state.gameLoader = false;
    },
    resetMessageBox: (state) => {
      state.messageBoxFlag = false;
      state.messageBoxMessage = "";
      state.messageboxType = "";
    },
  },
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
    builder.addCase(fetchGameDetails.pending, (state) => {
      state.gameDetailsLoader = true;
    });
    builder.addCase(fetchGameDetails.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.gameDetails = action.payload.details;
      }
      state.gameDetailsLoader = false;
    });
    builder.addCase(registerSlot.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.messageBoxFlag = true;
        state.messageBoxMessage = action.payload.message;
        state.messageboxType = "success";
      } else {
        state.messageBoxFlag = true;
        state.messageBoxMessage = "guueegguqfgvywueg";
        state.messageboxType = "error";
      }
    });
  },
});
export const { resetFlags, resetMessageBox } = gameModelSlice.actions;

export default gameModelSlice.reducer;
