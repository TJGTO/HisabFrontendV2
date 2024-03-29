import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  gameModelStateObj,
  createGameReqBody,
  updateGameReqBody,
  IUpdateTeamReqObj,
  updatePlayerStatusReqBody,
} from "../../app/gamedetails/domain";

import {
  createaGame,
  getActiveMatches,
  getMatchDetails,
  registerIngame,
  updateGame,
  getVenueList,
  updatePlayerStatus,
  updateTeamsofPlayers,
  getMatchPermissions,
} from "../../app/gamedetails/service";

const initialState: gameModelStateObj = {
  gameLoader: false,
  registerSlotLoader: false,
  errorOnCreation: false,
  gameDetailsLoader: false,
  gameCreationMessage: "",
  activeGames: [],
  gameDetails: null,
  messageBoxFlag: false,
  messageBoxMessage: "",
  messageboxType: "",
  venueList: [],
  permissionMatrix: {
    editSetting: false,
    approveOrReject: false,
    editTeam: false,
    player_id: "",
    excelDownload: false,
  },
};

export const createTheGame = createAsyncThunk(
  "gameModel/updateUser",
  async (data: createGameReqBody, { getState, dispatch }) => {
    try {
      const response = await createaGame(data);
      dispatch(fetchActiveGames());
      return response;
    } catch (err) {
      throw err;
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
export const fetchGamePermission = createAsyncThunk(
  "gameModel/fetchGamePermission",
  async (gameId: string) => {
    try {
      const response = await getMatchPermissions(gameId);
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const fetchVenueList = createAsyncThunk(
  "gameModel/fetchVenueList",
  async () => {
    try {
      const response = await getVenueList();
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const registerSlot = createAsyncThunk(
  "gameModel/registerSlot",
  async (data: FormData, { getState, dispatch }) => {
    try {
      const response = await registerIngame(data);
      const gameId: string = data.get("gameid")?.toString() || "";
      if (gameId) dispatch(fetchGameDetails(gameId));
      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const updateTheGame = createAsyncThunk(
  "gameModel/updateTheGame",
  async (data: updateGameReqBody, { getState, dispatch }) => {
    try {
      const response = await updateGame(data);
      dispatch(fetchGameDetails(data.gameid));
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updatePlayerStatusInMatch = createAsyncThunk(
  "gameModel/updatePlayerStatus",
  async (data: updatePlayerStatusReqBody, { getState, dispatch }) => {
    try {
      const response = await updatePlayerStatus(data);
      dispatch(fetchGameDetails(data.gameId));
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateTeamDetails = createAsyncThunk(
  "gameModel/updateTeams",
  async (data: IUpdateTeamReqObj, { getState, dispatch }) => {
    try {
      const response = await updateTeamsofPlayers(data);
      dispatch(fetchGameDetails(data.gameId));
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
      state.errorOnCreation = true;
      state.gameCreationMessage = action.error?.message || "";
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
    builder.addCase(registerSlot.pending, (state) => {
      state.registerSlotLoader = true;
    });
    builder.addCase(registerSlot.fulfilled, (state, action) => {
      state.registerSlotLoader = false;
      if (action.payload && action.payload.success) {
        state.messageBoxFlag = true;
        state.messageBoxMessage = action.payload.message;
        state.messageboxType = "success";
      } else {
        state.messageBoxFlag = true;
        state.messageBoxMessage =
          action.payload?.message || "Failed to Register";
        state.messageboxType = "error";
      }
    });
    builder.addCase(registerSlot.rejected, (state, action) => {
      state.registerSlotLoader = false;
      state.messageBoxFlag = true;
      state.messageBoxMessage = action.error?.message || "Failed to register";
      state.messageboxType = "error";
    });
    builder.addCase(updateTheGame.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.messageBoxFlag = true;
        state.messageBoxMessage = action.payload.message;
        state.messageboxType = "success";
      } else {
        state.messageBoxFlag = true;
        state.messageBoxMessage = action.payload?.message
          ? action.payload.message
          : "Failed to update";
        state.messageboxType = "error";
      }
    });
    builder.addCase(updatePlayerStatusInMatch.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.messageBoxFlag = true;
        state.messageBoxMessage = action.payload.message;
        state.messageboxType = "success";
      } else {
        state.messageBoxFlag = true;
        state.messageBoxMessage = action.payload?.message
          ? action.payload.message
          : "Failed to update";
        state.messageboxType = "error";
      }
    });
    builder.addCase(updatePlayerStatusInMatch.rejected, (state) => {
      state.messageBoxFlag = true;
      state.messageBoxMessage = "Failed to update the status";
      state.messageboxType = "success";
    });
    builder.addCase(fetchVenueList.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.venueList = action.payload.venueList;
      }
    });
    builder.addCase(updateTeamDetails.rejected, (state) => {
      state.messageBoxFlag = true;
      state.messageBoxMessage = "Failed to update the teams";
      state.messageboxType = "error";
    });
    builder.addCase(updateTeamDetails.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.messageBoxFlag = true;
        state.messageBoxMessage = action.payload.message;
        state.messageboxType = "success";
      } else {
        state.messageBoxFlag = true;
        state.messageBoxMessage = "Failed to update the teams";
        state.messageboxType = "error";
      }
    });
    builder.addCase(fetchGamePermission.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.permissionMatrix = action.payload.permissionMatrix;
      }
    });
  },
});
export const { resetFlags, resetMessageBox } = gameModelSlice.actions;

export default gameModelSlice.reducer;
